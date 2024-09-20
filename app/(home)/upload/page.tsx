import { Dropbox } from "@/components/ui/dropBox";
import { NEXT_AUTH_CONFIG } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { Upload, FileText, CheckCircle } from "lucide-react";

export default async function UploadPage() {
  const session = await getServerSession(NEXT_AUTH_CONFIG);

  return (
    <div className="w-full min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-primary-500 mb-8">
          Upload Your Files
        </h1>

        <div className="mb-10 bg-slate-900 rounded-xl p-8 shadow-2xl border border-slate-700">
          <Dropbox />
        </div>

        <div className="space-y-6 mt-10 bg-slate-900 rounded-xl p-8 shadow-xl border border-slate-700">
          <h2 className="text-2xl font-semibold text-primary-500 mb-6">
            Upload Process
          </h2>
          <UploadStep
            icon={<Upload className="text-secondary-500" />}
            title="Select Files"
            description="Choose the files you want to upload or drag and drop them here."
          />
          <UploadStep
            icon={<FileText className="text-secondary-500" />}
            title="Process Files"
            description="Our system will automatically process and analyze your files."
          />
          <UploadStep
            icon={<CheckCircle className="text-secondary-500" />}
            title="Complete"
            description="Your files are now ready for use in the B2B WhatsApp AI Bot."
          />
        </div>

        {session && (
          <div className="mt-10 p-6 bg-slate-900 rounded-xl shadow-xl border border-slate-700">
            <h2 className="text-xl font-semibold text-primary-500 mb-4">
              Session Info
            </h2>
            <pre className="text-sm text-gray-300 overflow-x-auto bg-slate-800 p-4 rounded-lg">
              {JSON.stringify(session, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}

function UploadStep({
  icon,
  title,
  description,
}: {
  icon: any;
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-start space-x-6 transition-transform hover:-translate-y-1 hover:shadow-lg hover:bg-slate-800 p-4 rounded-lg">
      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center border border-slate-600">
        {icon}
      </div>
      <div>
        <h3 className="text-xl font-semibold text-primary-400">{title}</h3>
        <p className="text-gray-400">{description}</p>
      </div>
    </div>
  );
}
