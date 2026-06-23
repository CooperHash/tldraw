import { createMermaidDiagram, MermaidDiagramError } from '@tldraw/mermaid'
import { useCallback, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { DefaultErrorFallback, ErrorBoundary, Tldraw, type Editor } from 'tldraw'
import 'tldraw/tldraw.css'
import './styles.css'

const defaultDiagram = `flowchart TD
  start([Start]) --> parse[Parse Mermaid text]
  parse --> render[Create tldraw shapes]
  render --> canvas{Infinite canvas}
  canvas --> edit[Move and edit shapes]
  canvas --> export[Use tldraw exports]
`

function App() {
	const editorRef = useRef<Editor | null>(null)
	const [diagram, setDiagram] = useState(defaultDiagram)
	const [status, setStatus] = useState('Ready')

	const renderDiagram = useCallback(async () => {
		const editor = editorRef.current
		if (!editor) return

		setStatus('Rendering')
		try {
			editor.deleteShapes([...editor.getCurrentPageShapeIds()])
			await createMermaidDiagram(editor, diagram)
			editor.selectNone()
			editor.zoomToFit({ animation: { duration: 250 } })
			setStatus('Rendered')
		} catch (error) {
			if (error instanceof MermaidDiagramError) {
				setStatus(`Unsupported or invalid ${error.diagramType} diagram`)
			} else {
				setStatus('Could not render diagram')
			}
			console.error(error)
		}
	}, [diagram])

	const handleMount = useCallback(
		(editor: Editor) => {
			editorRef.current = editor
			renderDiagram()
			return () => {
				editorRef.current = null
			}
		},
		[renderDiagram]
	)

	return (
		<div className="app">
			<aside className="panel">
				<header className="panel__header">
					<h1>Mermaid canvas</h1>
					<span>{status}</span>
				</header>
				<textarea
					value={diagram}
					onChange={(event) => setDiagram(event.currentTarget.value)}
					spellCheck={false}
					aria-label="Mermaid source"
				/>
				<button type="button" onClick={renderDiagram}>
					Render
				</button>
			</aside>
			<main className="canvas">
				<Tldraw onMount={handleMount} />
			</main>
		</div>
	)
}

document.addEventListener('DOMContentLoaded', () => {
	const rootElement = document.getElementById('root')
	if (!rootElement) throw new Error('Could not find root element')

	createRoot(rootElement).render(
		<ErrorBoundary
			fallback={(error) => <DefaultErrorFallback error={error} />}
			onError={(error) => console.error(error)}
		>
			<App />
		</ErrorBoundary>
	)
})
