import {FC} from 'react';
import './instructionModalStyles.scss'

interface InstructionModalProps {
    val: number;
    totalSteps: number;
    header: string;
    message: string;
}

const InstructionModal: FC<InstructionModalProps> = ({val, totalSteps, header, message}) => {
    return (
        <div className='instruction-modal-container'>
            <p className="title">{header}</p>
            <p className="description">
                {message}
            </p>
            <div className="step-info">
                {val} of {totalSteps}
            </div>
        </div>
    );
};

export default InstructionModal;