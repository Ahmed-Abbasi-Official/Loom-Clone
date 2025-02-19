'use client'
import React, { useState } from 'react'
import HomeCard from './HomeCard'
import { useRouter } from 'next/navigation'
import MeetingModal from './MeetingModal'
import { useUser } from '@clerk/nextjs'
import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk'
import { useToast } from '@/hooks/use-toast'
import { Textarea } from "@/components/ui/textarea"
import ReactDatePicker from 'react-datepicker'
import { Input } from './ui/input'


const MeetingTypeList = () => {
    const router = useRouter();
    const [meetingState, setMeetingState] = useState<'isScheduleMeeting' | 'isJoiningMeeting' | 'isInstantMeeting' | undefined>();
    const [values, setValues] = useState({
        dateTime: new Date(),
        description: '',
        link: ''
    });
    const [callDetails, setCallDetails] = useState<Call>()
    const { user } = useUser();
    const client = useStreamVideoClient();

    const { toast } = useToast()

    // * HANDLE CREATE MEETING 

    const createMeeting = async () => {
        if (!client || !user) return;

        try {

            if (!values.dateTime) {
                toast({
                    title: "Please Select date and Time"
                })
                return;
            }

            const id = crypto.randomUUID();
            const call = client.call('default', id);

            if (!call) throw new Error('Failed to create Call')

            const startsAt = values.dateTime.toISOString() || new Date(Date.now()).toISOString();
            const description = values.description || "Instant Meeting";

            await call.getOrCreate({
                data: {
                    starts_at: startsAt,
                    custom: {
                        description
                    }
                }
            })

            setCallDetails(call);

            if (!values.description) {
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

    const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callDetails?.id}`

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
                title="Schedule your Meeting"
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

            {!callDetails ? (
                <MeetingModal
                    isOpen={meetingState === 'isScheduleMeeting'}
                    onClose={() => setMeetingState(undefined)} // Fixed typo
                    className="text-center"
                    title="Create Meeting" // Provided required prop
                    buttonText="Start Meeting"
                    handleClick={createMeeting}
                >
                    <div className='flex flex-col gap-2.5 '>
                        <label className='text-base text-normal leading-[22px] text-sky-2'>
                            Add a description
                        </label>
                        <Textarea
                            className='border-none bg-[#343537]  rounded focus-visible:ring-0 focus-visible:ring-offset-0'
                            onChange={(e) => {
                                setValues({ ...values, description: e.target.value })
                            }}
                        />
                    </div>
                    <div className="flex w-full flex-col gap-2.5">
                        <label className='text-base text-normal leading-[22px] text-sky-2'>
                            Select Date and Time
                        </label>
                        <ReactDatePicker
                            selected={values.dateTime}
                            onChange={(date) => setValues({ ...values, dateTime: date! })}
                            showTimeSelect
                            timeFormat='HH:mm'
                            timeIntervals={15}
                            timeCaption='time'
                            dateFormat="MMMM d, yyyy h:mm aa"
                            className='w-full rounded bg-[#343537]  p-2 focus:outline-none'
                        />
                    </div>
                </MeetingModal>
            ) : (
                <MeetingModal
                    isOpen={meetingState === 'isScheduleMeeting'}
                    onClose={() => setMeetingState(undefined)} // Fixed typo
                    className="text-center"
                    title="Meeting Created" // Provided required prop
                    handleClick={() => {
                        navigator.clipboard.writeText(meetingLink);
                        toast({ title: "Link copied" })
                    }}
                    image="/icons/checked.svg"
                    buttonIcon='/icons/copy.svg'
                    buttonText='Copy Meeting Link'
                />
            )}

            <MeetingModal
                isOpen={meetingState === 'isJoiningMeeting'}
                onClose={() => setMeetingState(undefined)}
                title="Type the link here"
                className="text-center"
                buttonText="Join Meeting"
                handleClick={() => router.push(values.link)}
            >
                <Input
                    placeholder="Meeting link"
                    onChange={(e) => setValues({ ...values, link: e.target.value })}
                    className="border-none bg-[#323436] focus-visible:ring-0 focus-visible:ring-offset-0"
                />
            </MeetingModal>

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