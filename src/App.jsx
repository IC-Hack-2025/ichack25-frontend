import "./App.css";
import EventTree from "./EventTree";
import { Input } from "./Input";
import { Loader } from "./Loader";
import { useEffect, useState } from "react";
import { initialEdges, initialNodes } from "./nodes";
import { socket } from ".";
import { source } from "motion/react-client";
import { useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { GridLoader } from "react-spinners";


function App() {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [loadingState, setLoadingState] = useState(-1);
    const [treeKey, setTreeKey] = useState(0);

    const handleChange = (e) => {
        //console.log(e.target.value);
    };
    const onSubmit = (value) => {
        // handleSubmit(e);
        setIsSubmitted(true);
        setTreeKey(treeKey + 1);
        console.log("SUBMITTED " + value);
        socket.emit("request_timeline", value);
        //console.log("submitted");
    };

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent form submission

        setLoadingState(0); // Start loading

        setTimeout(() => {
            setLoadingState(1); // Move to the next state after 3 seconds
        }, 3000);

        setTimeout(() => {
            setLoadingState(2); // Move to the next state after another 3 seconds
        }, 6000);

        setTimeout(() => {
            setLoadingState(3); // Move to the final state after another 3 seconds
        }, 9000);

        setTimeout(() => {
            setLoadingState(-1); // Hide the loader after completion
        }, 12000);
    };

    return (
        <div className="App h-[100vh] w-[100vw]">
            <motion.div
                animate={{
                    y: isSubmitted ? "0%" : "30vh"
                }}
                transition={{ type: "spring", stiffness: 100, damping: 15 }}
                className="flex flex-col gap-4"
            >
                <AnimatePresence>
                    { !isSubmitted && <motion.div
                        layout
                        initial={{scale: 1, opacity: 1}}
                        exit={{ opacity: 0, scale: 0 }}
                        animate={{scale: isSubmitted ? 0 : 1, opacity: isSubmitted ? 0 : 1}}
                        transition={{duration: 0.5}}
                    >
                        <GridLoader size={30} color="gray" speedMultiplier={0.2}/>
                        <h1 className="text-4xl font-mono text-slate-500">HistorAI</h1>
                    </motion.div> }
                </AnimatePresence>
                <motion.div
                    layout className="mt-8 flex-shrink-0"
                >
                    <p className="text-slate-500 italic pr-[300px] mb-2">What would you like to learn about?</p>
                    <Input handleChange={handleChange} onSubmit={onSubmit} />
                </motion.div>
                <Loader currentState={loadingState} />
                <EventTree key={treeKey} />
            </motion.div>
        </div>
    );
}

export default App;
