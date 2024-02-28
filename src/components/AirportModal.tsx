import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";

export default function AirportModal(props: {airport: Object}) {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  return (
    <>
      <Button onPress={onOpen} className="rounded bg-white p-4 aspect-square items-center justify-center flex flex-col min-w-24 h-fit">
            <p className="text-black font-semibold text-xl">{props.airport.name}</p>
            <p className="text-black font-semibold">{props.airport.icao}</p>
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">{props.airport.name} Airport</ModalHeader>
              <ModalBody className="">
                <p> 
                Kastrup is Denmark’s main international airport, located at the island of Amager just 8 km south of Copenhagen and 24 km from Sweden’s Malmö. 
                It is the oldest, largest and also the busiest Scandinavian airport, measured by passenger count, direct long haul routes and total number of destinations.
                The airport is a hub for Scandinavian Airlines and serves many airlines. It was founded in 1925, and gained popularity when SAS started their famous "Noth Pole Route" with a DC-6 from Copenhagen to Los Angeles. 
                Today, there is almost not a single european airline not serving CPH in one form or another.
                </p>
                <p className="font-bold text-lg">Documents to download</p>
                <ul className="list-disc pl-4">
                    <li>
                        <a href={props.airport.standguide}>Stand Guide</a>
                        </li>
                    <li>
                        Standard Pushback Points
                        </li>
                    <li>
                        Standard Taxi Routes
                    </li>
                    <li>
                        Charts
                    </li>
                </ul>
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
