/* ==========================================================
   OUTFLO — LOCK MACHINE TIME OBSERVATION WRITES
   Scope: Make the trusted observation RPC the sole Machine-Time persistence path
   Last Updated:
   - date: 2026-10-07
   - note: remove direct service-role mutation privileges from the observation ledger
   ========================================================== */

revoke insert, update, delete, truncate
on table public.machine_time_observations
from service_role;
