import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Button from "./Button";
import RecordButton from "./RecordButton";
import StopButton from "./StopButton";
import Timer from "./Timer";
import Countdown from "./Countdown";
import { VideoActionsProps } from "react-video-recorder";

const ActionsWrapper = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Actions = ({
  isVideoInputSupported,
  isInlineRecordingSupported,
  thereWasAnError,
  isRecording,
  isCameraOn,
  streamIsReady,
  isConnecting,
  isRunningCountdown,
  isReplayingVideo,
  countdownTime,
  timeLimit,
  showReplayControls,
  replayVideoAutoplayAndLoopOff,
  useVideoInput,

  onTurnOnCamera,
  onTurnOffCamera,
  onOpenVideoInput,
  onStartRecording,
  onStopRecording,
  onPauseRecording,
  onResumeRecording,
  onStopReplaying,
  onConfirm,
}: VideoActionsProps) => {
  const renderContent = () => {
    const shouldUseVideoInput =
      !isInlineRecordingSupported && isVideoInputSupported;

    if (
      (!isInlineRecordingSupported && !isVideoInputSupported) ||
      thereWasAnError ||
      isConnecting ||
      isRunningCountdown
    ) {
      return null;
    }

    if (isReplayingVideo) {
      // return (
      //     <Button
      //       type='button'
      //       onClick={onStopReplaying}
      //       data-qa='start-replaying'
      //     >
      //       {'Use another video'}
      //     </Button>
      //   )
      return <div></div>;
    }

    if (isRecording) {
      // return (
      //     <StopButton
      //       type='button'
      //       onClick={onStopRecording}
      //       data-qa='stop-recording'
      //     />
      //   )
      return <div></div>;
    }

    if (isCameraOn && streamIsReady) {
      return (
        <RecordButton
          type="button"
          onClick={onStartRecording}
          data-qa="start-recording"
        />
      );
    }

    if (useVideoInput) {
      return (
        <Button type="button" onClick={onOpenVideoInput} data-qa="open-input">
          {"Upload a video"}
        </Button>
      );
    }

    return shouldUseVideoInput ? (
      <Button type="button" onClick={onOpenVideoInput} data-qa="open-input">
        {"Record a video"}
      </Button>
    ) : (
      <Button type="button" onClick={onTurnOnCamera} data-qa="turn-on-camera">
        {"Turn my camera ON"}
      </Button>
    );
  };

  return (
    <div>
      {isRecording && <Timer timeLimit={timeLimit} />}
      {isRunningCountdown && <Countdown countdownTime={countdownTime} />}
      <ActionsWrapper>{renderContent()}</ActionsWrapper>
    </div>
  );
};

Actions.propTypes = {
  t: PropTypes.func,
  isVideoInputSupported: PropTypes.bool,
  isInlineRecordingSupported: PropTypes.bool,
  thereWasAnError: PropTypes.bool,
  isRecording: PropTypes.bool,
  isCameraOn: PropTypes.bool,
  streamIsReady: PropTypes.bool,
  isConnecting: PropTypes.bool,
  isRunningCountdown: PropTypes.bool,
  countdownTime: PropTypes.number,
  timeLimit: PropTypes.number,
  showReplayControls: PropTypes.bool,
  replayVideoAutoplayAndLoopOff: PropTypes.bool,
  isReplayingVideo: PropTypes.bool,
  useVideoInput: PropTypes.bool,

  onTurnOnCamera: PropTypes.func,
  onTurnOffCamera: PropTypes.func,
  onOpenVideoInput: PropTypes.func,
  onStartRecording: PropTypes.func,
  onStopRecording: PropTypes.func,
  onPauseRecording: PropTypes.func,
  onResumeRecording: PropTypes.func,
  onStopReplaying: PropTypes.func,
  onConfirm: PropTypes.func,
};

export default Actions;
