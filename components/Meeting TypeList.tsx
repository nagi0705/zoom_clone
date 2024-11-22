"use client";

import { useState } from "react";
import HomeCard from "./HomeCard";
import { useRouter } from "next/navigation";
import MeetingModal from "@/components/MeetingModal";
import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useToast } from "@/hooks/use-toast";
import { Input } from "./ui/input";

// interface MeetingModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   title: string;
//   buttonText: string;
//   handleClick: () => void;
//   className?: string;
// }

const MeetingTypeList = () => {
  const router = useRouter();
  const [meetingState, setMeetingState] = useState<
    "isInstantMeeting" | "isScheduleMeeting" | "isJoinMeeting" | undefined
  >();
  const [isMeetingCreated, setIsMeetingCreated] = useState(false); // Meeting Created 状態
  const { user } = useUser();
  const client = useStreamVideoClient();
  const [callDetails, setCallDetails] = useState<Call | undefined>();
  const { toast } = useToast();
  const [values, setValues] = useState<{ link: string }>({ link: "" });

  const createInstantMeeting = async () => {
    if (!client || !user) {
      toast({
        title: "Error",
        description: "Please log in to start a meeting.",
      });
      return;
    }

    try {
      const id = crypto.randomUUID();
      const call = client.call("default", id);

      if (!call) throw new Error("Failed to create call");

      await call.getOrCreate();

      setCallDetails(call);
      setIsMeetingCreated(true);
      toast({ title: "Meeting Started", description: `Meeting ID: ${id}` });

      // Redirect to the video call
      router.push(`/meeting/${id}`);
    } catch (error) {
      console.error(error);
      toast({ title: "Error", description: "Failed to start a meeting." });
    }
  };

  const createScheduledMeeting = async () => {
    if (!client || !user) return;

    try {
      const id = crypto.randomUUID();
      const call = client.call("default", id);

      if (!call) throw new Error("Failed to create call");

      await call.getOrCreate();

      setCallDetails(call);
      setIsMeetingCreated(true); // 「Meeting Created」モーダル表示
      toast({ title: "Meeting Created" });
    } catch (error) {
      console.error(error);
      toast({ title: "Failed to create meeting" });
    }
  };

  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callDetails?.id}`;

  return (
    <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
      {/* 即時ミーティング (オレンジボタン) */}
      <HomeCard
        img="/icons/add-meeting.svg"
        title="New Meeting"
        description="Start an instant meeting"
        handleClick={() => setMeetingState("isInstantMeeting")}
        className="bg-orange-1"
      />

      {/* スケジュールミーティング (青ボタン) */}
      <HomeCard
        img="/icons/schedule.svg"
        title="Schedule Meeting"
        description="Plan your meeting"
        handleClick={() => setMeetingState("isScheduleMeeting")}
        className="bg-blue-1"
      />

      <HomeCard
        img="/icons/recordings.svg"
        title="View Recordings"
        description="Check out your recordings"
        handleClick={() => router.push("/recordings")}
        className="bg-purple-1"
      />

      <HomeCard
        img="/icons/join-meeting.svg"
        title="Join Meeting"
        description="via invitation link"
        handleClick={() => setMeetingState("isJoinMeeting")}
        className="bg-yellow-1"
      />

      {meetingState === "isInstantMeeting" && (
        <MeetingModal
          isOpen={meetingState === "isInstantMeeting"}
          onClose={() => setMeetingState(undefined)}
          title="Start an Instant Meeting"
          buttonText="Start Meeting"
          handleClick={createInstantMeeting}
        />
      )}

      {meetingState === "isScheduleMeeting" && (
        <MeetingModal
          isOpen={meetingState === "isScheduleMeeting"}
          onClose={() => setMeetingState(undefined)}
          title="Create a New Meeting"
          buttonText="Schedule Meeting"
          handleClick={createScheduledMeeting}
        >
          <div>
            <p className="text-gray-300 text-sm text-center">Meeting Description</p>
            <input
              type="text"
              placeholder="Enter meeting description"
              className="w-full mt-2 rounded-md bg-gray-800 px-3 py-2 text-sm text-white focus:outline-none"
            />
            <p className="text-gray-300 text-sm text-center mt-4">Date & Time</p>
            <input
              type="datetime-local"
              className="w-full mt-2 rounded-md bg-gray-800 px-3 py-2 text-sm text-white focus:outline-none"
            />
          </div>
        </MeetingModal>
      )}

      {isMeetingCreated && (
        <MeetingModal
          isOpen={isMeetingCreated}
          onClose={() => setIsMeetingCreated(false)}
          title="Meeting Created"
          buttonText="Copy Invitation"
          handleClick={() => {
            navigator.clipboard.writeText(meetingLink);
            toast({
              title: "Link copied!",
              description: `Copied: ${meetingLink}`,
            });
          }}
        >
          <div>
            <p className="text-gray-300 text-sm">Your meeting has been successfully created.</p>
            <p className="text-gray-500 text-xs mt-2">Meeting Link: {meetingLink}</p>
          </div>
        </MeetingModal>
      )}

      {meetingState === "isJoinMeeting" && (
        <MeetingModal
          isOpen={meetingState === "isJoinMeeting"}
          onClose={() => setMeetingState(undefined)}
          title="Type the link here"
          buttonText="Join Meeting"
          handleClick={() => router.push(values.link)}
        >
          <Input
            placeholder="Meeting link"
            className="border-none bg-dark-3 focus-visible:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
            onChange={(e) => setValues({ ...values, link: e.target.value })}
          />
        </MeetingModal>
      )}
    </section>
  );
};

export default MeetingTypeList;