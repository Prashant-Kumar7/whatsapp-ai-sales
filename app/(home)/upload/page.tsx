import { Dropbox } from "@/components/ui/dropBox";
import { NEXT_AUTH_CONFIG } from "@/lib/auth";
import { getServerSession } from "next-auth";


export default async function(){


    const session = await getServerSession(NEXT_AUTH_CONFIG)

    return (
        <div className="w-full h-full bg-slate-900 flex flex-col justify-center gap-6 px-10 items-center">
            <Dropbox/>
            <button className="p-2 bg-indigo-900 hover:bg-indigo-800 rounded-lg">submit</button>
            {JSON.stringify(session)}
        </div>
    )
}