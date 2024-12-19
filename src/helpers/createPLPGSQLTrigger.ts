import entities from "@constants/entities";

/**
 * Создать триггер для таблицы операционной базы данных
 */
export const createPLPGSQLTrigger = <
  EntityType extends (typeof entities)[0]["prototype"]
>({
  name,
  table,
  fires,
  events,
  columns = [],
  code,
}: {
  name: string;
  table: string;
  fires: "BEFORE" | "AFTER";
  events: ("INSERT" | "UPDATE" | "DELETE" | "TRUNCATE")[];
  columns?: (keyof EntityType)[];
  code: string;
}): {
  [x in "create" | "drop"]: { [x in "procedure" | "trigger"]: string };
} => {
  const strigifiedColumns = columns
    .map((column) => `"${column as string}"`)
    .join(", ");
  const stringifiedEvents = events
    .map((event) =>
      event === "UPDATE" ? `${event} OF ${strigifiedColumns}` : event
    )
    .join(" OR ");

  return {
    create: {
      procedure: `
      CREATE FUNCTION "${name}"()
        RETURNS trigger
        LANGUAGE 'plpgsql'
        COST 100
        VOLATILE NOT LEAKPROOF
      AS \$BODY\$
      ${code}
      \$BODY\$
    `,
      trigger: `
      CREATE TRIGGER "${name}"
        ${fires}
        ${stringifiedEvents}
        ON "${table}"
        FOR EACH ROW
        EXECUTE PROCEDURE "${name}"()
    `,
    },
    drop: {
      procedure: `DROP FUNCTION "${name}"()`,
      trigger: `DROP TRIGGER "${name}" ON "${table}"`,
    },
  };
};
