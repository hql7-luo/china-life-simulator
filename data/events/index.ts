import { careerEvents } from "@/data/events/career";
import { educationEvents } from "@/data/events/education";
import { familyEvents } from "@/data/events/family";
import { hiddenEvents } from "@/data/events/hidden";
import { regionalEvents } from "@/data/events/regional";
import { regularEvents } from "@/data/events/regular";

export { careerEvents, educationEvents, familyEvents, hiddenEvents, regionalEvents, regularEvents };

export const allEvents = [
  ...regularEvents,
  ...educationEvents,
  ...careerEvents,
  ...familyEvents,
  ...regionalEvents,
  ...hiddenEvents,
];

export const eventCounts = {
  regular: regularEvents.length,
  education: educationEvents.length,
  career: careerEvents.length,
  family: familyEvents.length,
  regional: regionalEvents.length,
  hidden: hiddenEvents.length,
  total: allEvents.length,
};
