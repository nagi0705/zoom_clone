"use client";

import Loader from '@/components/Loader';
//import MeetingRoom from '@/components/MeetingRoom';
import MeetingSetup from '@/components/MeetingSetup';
import { useGetCallById } from '@/hooks/useGetCallById';
import { useUser } from '@clerk/nextjs';
import { StreamCall, StreamTheme } from '@stream-io/video-react-sdk';
import { useState } from 'react';

const Meeting = ({ params: { id } }: { params: { id: string } }) => {
    const { isLoaded } = useUser(); //user
    const [isSetupComplete, setIsSetupComplete] = useState(false);
    const { call, isCallLoading } = useGetCallById(id);

    // ローディング中の場合の処理
    if (!isLoaded || isCallLoading) {
        return <Loader />;
    }

    return (
        <main className="h-screen w-full">
            <StreamCall call={call}>
                <StreamTheme>
                    {!isSetupComplete ? (
                        <MeetingSetup setIsSetupComplete={setIsSetupComplete} />
            ) : (
                        <div>
                            なんか代わりになるものを入れておいて
                        </div>
                        // <MeetingRoom>
                        //     <p className="text-gray-500 text-xs absolute top-4 right-4">
                        //         Logged in as: {user?.email || "Guest"}
                        //     </p>
                        // </MeetingRoom>
              )
            }
                </StreamTheme>
            </StreamCall>
        </main>
    );
};

export default Meeting;