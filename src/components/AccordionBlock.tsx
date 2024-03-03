
import {Accordion, AccordionItem} from "@nextui-org/react";

export default function App(props: {title: string, body: string}) {

  return (
    <Accordion isCompact>
      <AccordionItem key="1" aria-label={props.title} title={props.title}>
        {props.body}
      </AccordionItem>
    </Accordion>
  );
}
