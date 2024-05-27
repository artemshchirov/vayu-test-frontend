import { ReactNode } from 'react'

interface ModalProps {
  children: ReactNode
  currentStep: number
  isNextDisabled: boolean
  onClose?: () => void
  handleNextStep: () => void
  handleBackStep: () => void
  handleFinish: () => void
}

const Modal: React.FC<ModalProps> = ({
  children,
  currentStep,
  isNextDisabled,
  onClose,
  handleNextStep,
  handleBackStep,
  handleFinish,
}) => {
  const handleOpenModal = () => {
    const modalElement = document.getElementById('my_modal_1') as HTMLDialogElement | null
    if (modalElement) {
      modalElement.showModal()
    }
  }

  const handleCloseModal = () => {
    const modalElement = document.getElementById('my_modal_1') as HTMLDialogElement | null
    if (modalElement) {
      modalElement.close()
      handleFinish()
    }
  }

  return (
    <>
      <button className='btn text-white' onClick={handleOpenModal}>
        open modal
      </button>
      <dialog id='my_modal_1' className='modal'>
        <div className='modal-box bg-white'>
          <form method='dialog'>
            <button
              className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'
              onClick={onClose}
            >
              ✕
            </button>
            {children}
          </form>
          <div className='flex justify-between px-6'>
            <button
              className='btn text-white disabled:text-white w-[80px]'
              onClick={handleBackStep}
              disabled={currentStep === 1}
            >
              Back
            </button>
            {currentStep < 3 ? (
              <button
                className='btn text-white disabled:text-white w-[80px]'
                onClick={handleNextStep}
                disabled={isNextDisabled}
              >
                Next
              </button>
            ) : (
              <button
                className='btn btn-accent text-white w-[80px]'
                onClick={handleCloseModal}
                disabled={isNextDisabled}
              >
                Finish
              </button>
            )}
          </div>
        </div>
      </dialog>
    </>
  )
}

export default Modal