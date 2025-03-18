import {FC, useEffect, useState} from 'react';
import './tourGuideStyles.scss'
import Joyride, {CallBackProps, EVENTS, STATUS, Step} from "react-joyride";
import InstructionModal from "./InstructionModal/InstructionModal.tsx";


interface TourGuideProps {
    start: boolean;
    setStartTour: (start: boolean) => void;
    onTourEnd: () => void;
}

interface State {
    run: boolean,
    stepIndex: number,
    steps: Step[]
}

const TourGuide: FC<TourGuideProps> = ({start, setStartTour, onTourEnd}: TourGuideProps) => {
    const [progress, setProgress] = useState<number>(1)
    const totalSteps: number = 13

    const generateSteps = (val: number): Step[] => [
        {
            content: (
                <InstructionModal val={val} totalSteps={totalSteps}
                                  header={"Welcome to VSTOP"}
                                  message={"This is a guide for first time user & people who may or may not need a refresher for this tool."}
                />
            ),
            locale: {skip: <strong aria-label="skip">Skip</strong>},
            styles: {
                options: {
                    width: 700,
                },
            },
            placement: "center",
            target: "body",
        },
        {
            content: (
                <InstructionModal val={val} totalSteps={totalSteps} header={"Home"}
                                  message={"Click here whenever to go back to home page"}/>
            ),
            styles: {
                options: {
                    width: 380,
                },
            },
            placement: "bottom",
            target: ".logo",
        },
        {
            content: (
                <InstructionModal val={val} totalSteps={totalSteps} header={"Vendor Tab"}
                                  message={"This is where you can see all the vendors and manage vendor information."}/>
            ),
            styles: {
                options: {
                    width: 380,
                },
            },
            placement: "bottom",
            target: "#vendors",
        },
        {
            content: (
                <InstructionModal val={val} totalSteps={totalSteps} header={"Certification Tab"}
                                  message={"Here you can view and manage certification records."}/>
            ),
            styles: {
                options: {
                    width: 380,
                },
            },
            placement: "bottom",
            target: "#certification",
        },
        {
            content: (
                <InstructionModal val={val} totalSteps={totalSteps} header={"Components Tab"}
                                  message={"This section allows you to manage system components."}/>
            ),
            styles: {
                options: {
                    width: 380,
                },
            },
            placement: "bottom",
            target: "#component",
        },
        {
            content: (
                <InstructionModal val={val} totalSteps={totalSteps} header={"Counties Tab"}
                                  message={"View and manage county information here."}/>
            ),
            styles: {
                options: {
                    width: 380,
                },
            },
            placement: "bottom",
            target: "#couty",
        },
        {
            content: (
                <InstructionModal val={val} totalSteps={totalSteps} header={"Contracts Tab"}
                                  message={"Manage contract details and agreements here."}/>
            ),
            styles: {
                options: {
                    width: 380,
                },
            },
            placement: "bottom",
            target: "#contract",
        },
        {
            content: (
                <InstructionModal val={val} totalSteps={totalSteps} header={"Expenses Tab"}
                                  message={"Track and manage expenses in this section."}/>
            ),
            styles: {
                options: {
                    width: 380,
                },
            },
            placement: "bottom",
            target: "#expense",
        },
        {
            content: (
                <InstructionModal val={val} totalSteps={totalSteps} header={"Inventory Units Tab"}
                                  message={"View and manage inventory unit details here."}/>
            ),
            styles: {
                options: {
                    width: 380,
                },
            },
            placement: "bottom",
            target: "#inventory-unit",
        },
        {
            content: (
                <InstructionModal val={val} totalSteps={totalSteps} header={"Dispositions Tab"}
                                  message={"Manage inventory dispositions and tracking here."}/>
            ),
            styles: {
                options: {
                    width: 380,
                },
            },
            placement: "bottom",
            target: "#disposition",
        },
        {
            content: (
                <InstructionModal val={val} totalSteps={totalSteps} header={"Storage Locations Tab"}
                                  message={"This section helps manage storage location details."}/>
            ),
            styles: {
                options: {
                    width: 380,
                },
            },
            placement: "bottom",
            target: "#storage-location",
        },
        {
            content: (
                <InstructionModal val={val} totalSteps={totalSteps} header={"Audits Tab"}
                                  message={"This section allows you to review audit records and statuses."}/>
            ),
            styles: {
                options: {
                    width: 380,
                },
            },
            placement: "bottom",
            target: "#audit",
        },
        {
            content: (
                <InstructionModal val={val} totalSteps={totalSteps} header={"Logout Button"}
                                  message={"Click here to securely log out of the system."}/>
            ),
            styles: {
                options: {
                    width: 380,
                },
            },
            placement: "bottom",
            target: "#logout",
            locale: {skip: <strong aria-label="skip">Skip</strong>}
        }
    ]

    const [{run, steps}, setState] = useState<State>({
        run: start,
        stepIndex: 0,
        steps: generateSteps(progress)
    })

    useEffect(() => {
        setState((prevState) => ({
            ...prevState,
            steps: generateSteps(progress)
        }))
    }, [progress]);

    useEffect(() => {
        if (start) {
            setState((prevState) => ({
                ...prevState,
                run: true,
                stepIndex: 0
            }))
        }
    }, [start]);

    const handleJoyrideCallback = (data: CallBackProps) => {
        const {status, type, index} = data;

        const finishedStatuses: string[] = [STATUS.FINISHED, STATUS.SKIPPED];

        if (finishedStatuses.includes(status)) {
            setState({steps, run: false, stepIndex: 0});
            setStartTour(false);
            onTourEnd();
        } else if (([EVENTS.STEP_BEFORE] as string[]).includes(type)) {
            setProgress(index + 1);
        }
    };

    return (
        <Joyride
            continuous
            callback={handleJoyrideCallback}
            run={run}
            steps={steps}
            styles={{
                options: {
                    primaryColor: '#000F5D',
                },
            }}
            scrollToFirstStep
            debug
        />
    );
};

export default TourGuide;