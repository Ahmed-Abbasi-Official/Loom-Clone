'use client'
import React, { useState } from 'react'
import HomeCard from './HomeCard'
import { useRouter } from 'next/navigation'
import MeetingModal from './MeetingModal'
import { useUser } from '@clerk/nextjs'
import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk'
import { useToast } from '@/hooks/use-toast'

const MeetingTypeList = () => {
    const router = useRouter();
    const [meetingState, setMeetingState] = useState<'isScheduleMeeting' | 'isJoiningMeeting' | 'isInstantMeeting' | undefined>();
    const [values,setValues]=useState({
        dateTime:new Date(),
        description:'',
        link:''
    });
    const [callDetails, setCallDetails] = useState<Call>()
    const { user } = useUser();
    const client = useStreamVideoClient();

    const { toast } = useToast()

    // * HANDLE CREATE MEETING 

    const createMeeting = async () => {
        if (!client || !user)  return ;

        try {

            if(!values.dateTime){
                toast({
                    title: "Please Select date and Time"
                  })
                  return;
            }

            const id = crypto.randomUUID();
            const call = client.call('default', id);

            if (!call) throw new Error('Failed to create Call')

            const startsAt = values.dateTime.toISOString() || new Date(Date.now()).toISOString() ;
            const description = values.description || "Instant Meeting";

            await call.getOrCreate({
                data:{
                    starts_at:startsAt,
                    custom:{
                        description
                    }
                }
            })

            setCallDetails(call);

            if(!values.description){
                router.push(`/meeting/${call.id}`)
            }
            toast({
                title: "Meeting Created"
              })

        } catch (error) {
            console.log(error)
            toast({
                title: "Failed to Create Meeting"
              })
        }
    }

    return (
        <section className='grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4'>
            <HomeCard
                img='/icons/add-meeting.svg'
                title="New Meeting"
                description="Start an instant meeting"
                handleClick={() => setMeetingState('isInstantMeeting')}
                className='bg-orange-1'
            />
            <HomeCard
                img='/icons/join-meeting.svg'
                title="Join Meeting"
                description="via invitation link"
                handleClick={() => setMeetingState('isJoiningMeeting')}
                className='bg-blue-1'
            />
            <HomeCard
                img='/icons/schedule.svg'
                title="Plan your Meeting"
                description="Start an instant meeting"
                handleClick={() => setMeetingState('isScheduleMeeting')}
                className='bg-purple-1'
            />
            <HomeCard
                img='/icons/recordings.svg'
                title="View Recordings"
                description="check out your recordings"
                handleClick={() => router.push('/recordings')}
                className='bg-yellow-1'
            />
            <MeetingModal
                isOpen={meetingState === 'isInstantMeeting'}
                onClose={() => setMeetingState(undefined)} // Fixed typo
                className="text-center"
                title="Start Meeting" // Provided required prop
                buttonText="Start Meeting"
                handleClick={createMeeting}
            />
        </section>
    )
}

export default MeetingTypeList