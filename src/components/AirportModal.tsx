import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";

interface Airport {
  name: string,
  icao:string,
  iata: string,
  qri?: any,
  documents?: any
}

export default function AirportModal(props: {airport: Airport}) {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  return (
    <>
      <Button onPress={onOpen} className="rounded-lg bg-snow p-2 items-center justify-center flex flex-col w-full h-32 shadow-lg">
            <p className="text-black font-bold text-3xl">{props.airport.icao} | {props.airport.iata}</p>
            <p className="text-black font-normal text-2xl">{props.airport.name}</p>
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="xl" placement="top">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-2xl">{props.airport.name} Airport</ModalHeader>
              <ModalBody className="">
                <h4 className="text-lg font-semibold">QRI - Quick Refrence Information</h4>
                <ul className="list-disc pl-4">
                  {
                    props.airport.qri ?
                    props.airport.qri.map((item) => (
                      <li>{item}</li>
                    ))
                    : "n/a"
                  }
                </ul>
                <hr />
                <p className="text-lg font-semibold">Documents to download</p>
                <ul className="list-disc pl-4">
                    {
                      props.airport.documents ?
                      props.airport.documents.map((item) => (
                        <li><a href={item.link}>{item.name}</a></li>
                      ))
                      : "n/a"
                    }
                </ul>
                <hr />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
