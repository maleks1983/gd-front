import { useContext } from "react";
import {BatchUIContext} from "../context/batchUIContext.js";


export const useBatchUI = () => useContext(BatchUIContext);