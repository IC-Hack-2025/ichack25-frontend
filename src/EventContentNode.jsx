import React from "react";
import { Handle, ReactFlowProvider } from "@xyflow/react";
import { Card } from "./Card";

const card = {
  description: "Lord Himesh",
  title: "Aap Ka Suroor",
  srcs: [
    "https://images.unsplash.com/photo-1494806812796-244fe51b774d?q=80&w=3534&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1518710843675-2540dd79065c?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1590041794748-2d8eb73a571c?q=80&w=3456&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1679420437432-80cfbf88986c?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ],
  ctaText: "Visit",
  ctaLink: "https://ui.aceternity.com/templates",
  content: () => {
    return (
      <p>
        Himesh Reshammiya, a renowned Indian music composer, singer, and actor,
        is celebrated for his distinctive voice and innovative compositions.
        Born in Mumbai, India, he has become a prominent figure in the Bollywood
        music industry. <br /> <br />
        His songs often feature a blend of contemporary and traditional Indian
        music, capturing the essence of modern Bollywood soundtracks. With a
        career spanning over two decades, Himesh Reshammiya has released
        numerous hit albums and singles that have garnered him a massive fan
        following both in India and abroad. Himesh Reshammiya, a renowned Indian
        music composer, singer, and actor, is celebrated for his distinctive
        voice and innovative compositions. Born in Mumbai, India, he has become
        a prominent figure in the Bollywood music industry. <br /> <br />
        His songs often feature a blend of contemporary and traditional Indian
        music, capturing the essence of modern Bollywood soundtracks. With a
        career spanning over two decades, Himesh Reshammiya has released
        numerous hit albums and singles that have garnered him a massive fan
        following both in India and abroad. Himesh Reshammiya, a renowned Indian
        music composer, singer, and actor, is celebrated for his distinctive
        voice and innovative compositions. Born in Mumbai, India, he has become
        a prominent figure in the Bollywood music industry. <br /> <br />
        His songs often feature a blend of contemporary and traditional Indian
        music, capturing the essence of modern Bollywood soundtracks. With a
        career spanning over two decades, Himesh Reshammiya has released
        numerous hit albums and singles that have garnered him a massive fan
        following both in India and abroad.
      </p>
    );
  },
};

const EventContentNode = ({ data }) => {
  return (
    <>
      <ReactFlowProvider>
        <Handle
          id="a"
          type="target"
          position="top"
          style={{ background: "#555" }}
        />
        <Card card={data} />
        <Handle
          id="b"
          type="source"
          position="bottom"
          style={{ background: "#555" }}
        />
      </ReactFlowProvider>
    </>
  );
};

export default EventContentNode;
