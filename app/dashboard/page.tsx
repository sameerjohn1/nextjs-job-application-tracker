import { getSession } from "@/lib/auth/auth"
import connectDB from "@/lib/db"
import { Board } from "@/lib/models"
import { redirect } from "next/navigation"
import { initializeUserBoard } from "@/lib/init-user-board"
import KanbanBoard from "@/components/kanban-board"

export default async function Dashboard() {
    const session = await getSession()

    if (!session?.user) {
        redirect("/sign-in")
    }

    await connectDB()

    let board = await Board.findOne({
        userId: session.user.id,
        name: "Job Hunt"
    }).populate({
        path: "columns"
    })

    if (!board) {
        board = await initializeUserBoard(session.user.id)
    }



    return (
        <div className="min-h-screen bg-white" >
            <div className="container mx-auto p-6" >
                <div className="mb-6" >
                    <h1 className="text-3xl font-bold text-black" >{board?.name}</h1>
                    <p className="text-gray-600" >Track your job applications</p>
                </div>

                <KanbanBoard board={JSON.parse(JSON.stringify(board))} userId={session.user.id} />
            </div>
        </div>
    )
}