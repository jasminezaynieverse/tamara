# A Contemporary Tamara

## Design Rationale

Tamara is a city that refuses to let things remain simply things.

In Italo Calvino’s *Invisible Cities*, the traveller encounters the city through a dense system of signs: pincers point to the tooth-drawer, a tankard becomes a tavern, and lions, towers, and stars point toward meanings beyond themselves.

> “Your gaze scans the streets as if they were written pages.”

Tamara does not simply contain signs. It becomes legible through them.

But legibility is not innocent.

The more Tamara explains itself, the less room it leaves for the visitor to encounter anything before it has already been named. The city “says everything you must think,” until travelling begins to resemble reading the city back to itself. The visitor believes they are collecting experiences; what they accumulate are names.

My version begins from this tension.

The reader first encounters Calvino’s prose as continuous text. As they move forward, signs begin to enter the page. They cover words, interrupt sentences, and compete with the act of reading. To continue, the reader must grab and move them.

The sign is therefore not an illustration of the city. It physically takes a position between the reader and the city.

A contemporary Tamara would also speak through visual languages we already know: logos, branding, transport graphics, interfaces, and commercial typography. Words such as **APPLE**, **TARGET**, or **HOURGLASS** can arrive with images, products, colours, and associations before we consciously return to their literal meanings.

The name arrives already interpreted.

When the reader holds a sign, the panel on the right responds with another layer of related terms and suggested associations. Release the sign, and the layer disappears.

The interaction creates a simple chain:

**the city becomes a sign →**
**the sign becomes a name →**
**the name becomes a prompt for further associations**

The reader tries to clear the page, yet touching a sign produces another system for interpreting it. There is no clean moment after the sign—only another layer of mediation.

This is where Calvino’s idea becomes contemporary for me. A system does not have to explicitly say:

**Think this.**

It can simply ask:

**Did you mean this?**

And that may be enough.

Saidiya Hartman’s *Venus in Two Acts* sharpened another part of this question: the difference between what can be recorded and what can actually be known. Hartman writes within a very different historical context, and I am not treating that context as equivalent to Calvino’s fictional city. Her work instead made me more attentive to the danger of confusing legibility with lived experience.

A name can preserve something.
A sign can make something readable.
A search can make something findable.

But none of these guarantees that we have encountered the thing itself.

The reader enters looking for a city.

**Tamara gives them names.**

---

## Interaction

* Hold the **↓ arrow** to move through the reading.
* As the text progresses, signs gradually enter and obstruct the page.
* **Drag a sign** to reveal its associated search layer.
* Release it and the sign returns to the city.
* Continue to the end to leave Tamara.

---

## Sound

Sound follows the same movement from environment to interpretation.

The opening uses a natural river sound, while the city introduces a score generated from a **map of Midtown Atlanta**.

Rather than composing the city music independently from the visual environment, I treated the map itself as musical material. A simplified Atlanta map is scanned from west to east over approximately two minutes. Features in the map are translated into changes in the sound: green areas influence pitch and atmosphere, major roads contribute rhythmic events, and denser urban texture contributes to the lower-frequency layer.

The approach was inspired by pepepepebrick’s project **“What If a Map Could Become a Musical Instrument?”**, which explores using the visual properties of maps as signals for sound.

For this project, the result is exported as `midtown-map-score.mp3` and used as Tamara’s city soundtrack.

In this sense, the city is being “read” twice: first as a map, then as sound.

---

## Technical Note

The project is built entirely in **p5.js**.

I designed the interaction, visual direction, asset system, reading flow, and conceptual framing. I used AI as a coding assistant when learning unfamiliar p5.js techniques and debugging specific interactions, including timing, responsive layouts, image hit detection, audio behaviour, and animation.

The project was developed through iterative testing and adjustment rather than generated as a complete system.
