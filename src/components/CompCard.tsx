import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
  Button,
} from "@nextui-org/react";

interface Competition {
  title: string;
  subtitle: string;
  link: string;
  image?: string;
}

export default function App(props: { competition: Competition }) {
  return (
    <Card isBlurred className="border-none bg-snow/95 drop-shadow-lg">
      <CardHeader className="flex flex-col items-start bg-vat2/95">
        <p className="text-tiny text-white/60 uppercase font-bold text-shadow">
          {props.competition.subtitle}
        </p>
        <h4 className="text-white font-medium text-large drop-shadow-xl">
          {props.competition.title}
        </h4>
      </CardHeader>
      <CardBody>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut, corrupti neque esse inventore autem doloremque totam. Nesciunt, aspernatur cupiditate, nulla qui magnam facilis deleniti sint iste enim ipsa, dignissimos recusandae.
      </CardBody>
      <CardFooter className="bg-vat3/95 flex justify-between">
        <div className="flex flex-col items-start">
            <p className="text-tiny text-snow">Join our Volanta team</p>
            <p className="text-tiny text-snow">to be a part of this competition</p>
        </div>
        <button className="bg-snow hover:bg-vat1 rounded-xl p-2 hover:font-bold text-tiny">Sign Up</button>
      </CardFooter>
    </Card>
  );
}
