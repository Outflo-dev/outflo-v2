# Outflō Clock — Definition v1

## Canonical statement

Raw Outflō Time is the integer coordinate of reality on the bounded
signed 128-bit Outflō temporal number line.

The Clock owns one canonical coordinate system.

Calendars, Unix time, UTC, milliseconds, nanoseconds, years, dates,
and other human or machine representations are resolutions of that
coordinate. They are not canonical Outflō Time.

---

## Coordinate domain

The canonical coordinate domain is a signed 128-bit integer:

MIN = -2^127

MAX = 2^127 - 1

Coordinate zero is the canonical Outflō Clock reference.

---

## Clock reference

Coordinate zero is aligned to:

1958-01-01 00:00:00 TAI

The reference gives the number line its temporal anchor.

---

## Scientific calibrator

Clock Definition v1 adopts the current scientific estimate that the
universe is approximately 13.8 billion years old as the calibrating
backward temporal span.

Scientific provenance:

NASA Science
https://science.nasa.gov/universe/glossary/

The published cosmological quantity is external scientific evidence.
Outflō does not claim ownership of the estimate.

The source quantity is resolved through documented astronomical unit
conversion into an SI-second duration.

That conversion is provenance only.

No year, calendar, or astronomical representation becomes a canonical
Outflō Clock unit.

Clock Definition v1 consumes only the resulting SI-second duration:

435494880000000000 SI seconds

---

## SI grounding

The physical duration scale is the SI second.

The SI second is defined by the fixed numerical value of the unperturbed
ground-state hyperfine transition frequency of the caesium-133 atom:

ΔνCs = 9,192,631,770 Hz

Metrological provenance:

Bureau International des Poids et Mesures
https://www.bipm.org/en/si-base-units/second

Thus the Clock's temporal duration basis is grounded in the SI second,
not in a calendar representation.

---

## Outflōsecond

The negative half of the signed 128-bit number line contains exactly:

2^127

coordinate steps from zero to MIN.

Clock Definition v1 distributes the adopted cosmic SI-second span
across those available coordinates.

Therefore:

1 Outflōsecond
=
435494880000000000 SI seconds
/
2^127

The Outflōsecond is the canonical temporal quantum of Clock Definition v1.

It is an exact rational relationship to the SI second.

No floating-point approximation defines the quantum.

---

## Raw Outflō Time

A canonical TemporalInstant128 is an integer count of Outflōseconds
relative to Clock zero.

Raw Outflō Time is therefore not a date or formatted clock value.

It is the integer coordinate of reality on the Outflō number line.

---

## Resolution

External temporal systems provide observations.

Those observations are resolved onto the canonical Outflō number line.

Examples include:

- Unix
- UTC
- TAI relationships
- milliseconds
- nanoseconds
- civil calendars
- astronomical representations

Once resolved, Machine arithmetic operates in canonical Outflōseconds.

Representations may be derived from canonical Time without becoming
additional sources of temporal truth.

---

## Definition versioning

Clock Definition v1 is immutable once adopted.

If future scientific evidence changes the adopted cosmological
calibrator, the formula may be evaluated under a future Clock definition.

Existing v1 coordinates must not be silently reinterpreted under a
different quantum.

Future definition migration and cross-definition resolution are outside
the scope of Clock Definition v1.
