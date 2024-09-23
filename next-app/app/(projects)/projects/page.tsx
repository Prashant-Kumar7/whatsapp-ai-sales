"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import {
  UserIcon,
  BriefcaseIcon,
  MapPinIcon,
  PhoneIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import { DialogDemo } from "@/components/ui/dialogBox";
import axios from "axios";
import { useEffect, useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { EditDialogDemo } from "@/components/ui/editDialogBox";
import { DeleteDeleteDialogBox } from "@/components/ui/deleteDialogBox";

interface projectinterface {
  id: string;
  title: string;
  description: string;
  data: data[];
  clientId: string;
}
interface data {
  id: string;
  phoneno: number;
  name: string;
  projectId: string;
  project: projectinterface;
}

export default function Dashboard() {
  const { data: session, status } = useSession();
  const [projects, setProjects] = useState<projectinterface[]>([]);

  const getProjects = async () => {
    const res = await axios.get("/api/projects/getProjects");
    setProjects(res.data.projects);
  };

  useEffect(() => {
    getProjects();
  }, []);

  if (status === "unauthenticated") {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <p className="text-2xl font-semibold text-gray-600">
          User is not signed in
        </p>
      </div>
    );
  } else if (status === "loading") {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <p className="text-2xl font-semibold text-gray-600">Loading...</p>
      </div>
    );
  } else {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row justify-between ">
          <div className="w-full lg:w-1/4">
            <div className="bg-white shadow-2xl rounded-3xl overflow-hidden w-full">
              <div className="px-10 py-12">
                <div className="flex flex-col items-center mb-8">
                  {session?.user?.image ? (
                    <Image
                      src={session?.user?.image}
                      alt="User avatar"
                      width={120}
                      height={120}
                      className="rounded-full border-4 border-primary-500 shadow-lg"
                    />
                  ) : (
                    <div className="w-32 h-32 bg-primary-500 rounded-full flex items-center justify-center shadow-lg">
                      <UserIcon className="h-20 w-20 text-white" />
                    </div>
                  )}
                  <h2 className="mt-4 text-3xl font-bold text-gray-800">
                    {session?.user?.name}
                  </h2>
                  <p className="text-gray-600">{session?.user?.email}</p>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center text-gray-700">
                    <BriefcaseIcon className="h-6 w-6 mr-3 text-primary-500" />
                    <span>
                      <strong>Company:</strong>{" "}
                      {session?.user?.companyName || "Not specified"}
                    </span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <MapPinIcon className="h-6 w-6 mr-3 text-primary-500" />
                    <span>
                      <strong>Address:</strong>{" "}
                      {session?.user?.address || "Not specified"}
                    </span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <PhoneIcon className="h-6 w-6 mr-3 text-primary-500" />
                    <span>
                      <strong>Phone:</strong>{" "}
                      {session?.user?.phone || "Not specified"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-5">
              <DialogDemo />
            </div>
          </div>
          <div className="text-primary-600 text-4xl font-bold w-full mt-10 lg:mt-0 lg:ml-10">
            Projects overview
            <div className="grid grid-cols-1 sm:grid-cols-2  xl:grid-cols-3 gap-6 mt-8">
              {projects.map((p) => (
                <Link href={`/${p.id}/dashboard`} key={p.id}>
                  <Card
                    title={p.title}
                    className="h-full text-black shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105 flex flex-col"
                  >
                    <CardContent className="p-6 bg-white flex-grow">
                      <div className="text-sm text-gray-600">
                        {p.description}
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-end gap-6 p-4 mt-auto">
                      <div
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                        }}
                      >
                        <EditDialogDemo
                          projectId={p.id}
                          title={p.title}
                          description={p.description}
                        />
                      </div>
                      <div
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                        }}
                      >
                        <DeleteDeleteDialogBox projectId={p.id} />
                      </div>
                    </CardFooter>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
