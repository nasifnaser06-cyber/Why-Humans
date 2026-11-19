import React from "react";
import { Composition, Folder } from "remotion";
import { FORMATS, VIDEO, seconds } from "./config/video";
import { Placeholder } from "./compositions/Placeholder/Placeholder";
import { EpisodeCompositions } from "./episodes";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Folder name="System">
        <Composition
          id="Placeholder"
          component={Placeholder}
          durationInFrames={seconds(5)}
          fps={VIDEO.fps}
          width={VIDEO.width}
          height={VIDEO.height}
        />
        <Composition
          id="Placeholder-9x16"
          component={Placeholder}
          durationInFrames={seconds(5)}
          fps={FORMATS.portrait.fps}
          width={FORMATS.portrait.width}
          height={FORMATS.portrait.height}
        />
      </Folder>
      <EpisodeCompositions />
    </>
  );
};
