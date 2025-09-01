import { IoIosCloseCircle } from "react-icons/io";
import { HiMiniArrowDownTray } from "react-icons/hi2";
import { FaCircleCheck } from "react-icons/fa6";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";
import { useState } from "react";

export default function Logs() {
  const [logsActive, setLogsActive] = useState<boolean>(true);

  return (
    <div
      className={`w-[23%] flex flex-col gap-8 h-full p-4 absolute ${logsActive ? "right-0" : "right-full"} top-0 bg-white z-30 border-l border-neutral-400`}
    >
      <IoIosCloseCircle
        onClick={() => setLogsActive(false)}
        className="text-neutral-400  text-xl"
      />
      <h3 className="text-xl text-neutral-500">Logs</h3>
      <div className="flex flex-col gap-4">
        <Accordion type="single" collapsible className="flex flex-col gap-2">
          <AccordionItem value="item-1">
            <AccordionTrigger>
              <span className="text-lg text-blue-400">
                <HiMiniArrowDownTray />
              </span>
              <span>4 product/s imported to Shopify</span>
              <span>24/08/2025 at 14:37</span>
            </AccordionTrigger>
            <AccordionContent>
              <ul className="mt-2 text-neutral-500 ml-7 flex flex-col gap-1">
                <li className="flex gap-2 items-center">
                  <FaCircleCheck className="text-sm text-green-500" />
                  Ninebot G30D Abdecuknggehauseschmeiser
                </li>
                <li className="flex gap-2 items-center">
                  <FaCircleCheck className="text-sm text-green-500" />
                  Ninebot G30D Abdecuknggehauseschmeiser
                </li>
                <li className="flex gap-2 items-center">
                  <FaCircleCheck className="text-sm text-green-500" />
                  Ninebot G30D Abdecuknggehauseschmeiser
                </li>
                <li className="flex gap-2 items-center">
                  <FaCircleCheck className="text-sm text-green-500" />
                  Ninebot G30D Abdecuknggehauseschmeiser
                </li>
              </ul>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-1">
            <AccordionTrigger>
              <span className="text-lg text-blue-400">
                <HiMiniArrowDownTray />
              </span>
              <span>4 product/s imported to Shopify</span>
              <span>24/08/2025 at 14:37</span>
            </AccordionTrigger>
            <AccordionContent>
              <ul className="mt-2 text-neutral-500 ml-7 flex flex-col gap-1">
                <li className="flex gap-2 items-center">
                  <FaCircleCheck className="text-sm text-green-500" />
                  Ninebot G30D Abdecuknggehauseschmeiser
                </li>
                <li className="flex gap-2 items-center">
                  <FaCircleCheck className="text-sm text-green-500" />
                  Ninebot G30D Abdecuknggehauseschmeiser
                </li>
                <li className="flex gap-2 items-center">
                  <FaCircleCheck className="text-sm text-green-500" />
                  Ninebot G30D Abdecuknggehauseschmeiser
                </li>
                <li className="flex gap-2 items-center">
                  <FaCircleCheck className="text-sm text-green-500" />
                  Ninebot G30D Abdecuknggehauseschmeiser
                </li>
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
