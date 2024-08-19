import { useCallback, useEffect, useState } from "react"
import Quill from "quill"
import { io, Socket } from 'socket.io-client'

import { toolBarsOptions } from '../config/quill-config'

import "quill/dist/quill.snow.css";
import './styles.css'

export default function Editor() {
    const [socket, setSocket] = useState<Socket | undefined>()
    const [quill, setQuill] = useState<Quill | undefined>()

    const wrapperRef = useCallback((wrapper: HTMLDivElement) => {
        if (wrapper == null) return

        wrapper.innerHTML = ""
        const editor = document.createElement("div")
        wrapper.append(editor)

        const quill = new Quill(editor, { theme: 'snow', modules: { toolbar: toolBarsOptions } })

        setQuill(quill)

    }, [])

    useEffect(() => {
        const socketServer = io('http://localhost:3000')
        setSocket(socketServer)

        return () => { socketServer.disconnect() }

    }, [])

    useEffect(() => {
        if (socket == null || quill == null) return

        const handleQuillOn = (delta, oldDelta, source) => {
            if (source !== 'user') return

            socket?.emit('send-changes', delta)
        }

        quill?.on('text-change', handleQuillOn)

        return () => { quill?.off('text-change', handleQuillOn) }

    }, [quill, socket])

    useEffect(() => {
        if (socket == null || quill == null) return

        const handleReceiveChanges = (delta) => {
            quill.updateContents(delta)
        }

        socket.on("receive-changes", handleReceiveChanges)

        return () => { socket?.off("receive-changes", handleReceiveChanges) }
    }, [socket, quill])

    return (
        <div className="container" ref={wrapperRef}></div>
    )
}