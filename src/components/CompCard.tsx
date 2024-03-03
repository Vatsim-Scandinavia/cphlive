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
    <Card className="">
      <CardHeader className="absolute z-10 top-0 flex-col !items-start backdrop-blur backdrop-opacity-95 border-b-2 border-snow/30">
        <p className="text-tiny text-white/60 uppercase font-bold text-shadow">
          {props.competition.subtitle}
        </p>
        <h4 className="text-white font-medium text-large drop-shadow-xl">
          {props.competition.title}
        </h4>
      </CardHeader>
      <Image
        removeWrapper
        alt="Card background"
        className="z-0 w-full h-full object-cover opacity-25 backdrop-opacity-25"
        src={
          props.competition.image ? props.competition.image : "/background.jpg"
        }
      />
      <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
        <div className="flex flex-grow gap-2 items-center">
          <div className="flex flex-col">
            <p className="text-tiny text-white/60">Join the competition via Volanta</p>
            <p className="text-tiny text-white/60">Get a good night's sleep.</p>
          </div>
        </div>
        <Button radius="full" size="sm">
          Sign Up
        </Button>
      </CardFooter>
    </Card>
  );
}
