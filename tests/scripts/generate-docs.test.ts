import { describe, it, expect } from "vitest";
import { z } from "zod";
import {
  esc,
  codeInline,
  describeType,
  toSchema,
} from "../../scripts/generate-docs.js";

describe("generate-docs script helpers", () => {
  describe("esc helper function", () => {
    it("should return an empty string if input is not a string", () => {
      // @ts-expect-error - testing invalid input
      expect(esc(null)).toBe("");
      // @ts-expect-error - testing invalid input
      expect(esc(undefined)).toBe("");
      // @ts-expect-error - testing invalid input
      expect(esc(123)).toBe("");
    });

    it("should escape pipe characters", () => {
      expect(esc("foo | bar")).toBe("foo \\| bar");
    });

    it("should escape backslash characters", () => {
      expect(esc("foo \\ bar")).toBe("foo \\\\ bar");
    });

    it("should escape backtick characters", () => {
      expect(esc("foo ` bar")).toBe("foo \\` bar");
    });

    it("should escape less than and greater than characters", () => {
      expect(esc("<div>")).toBe("&lt;div&gt;");
    });

    it("should replace newlines with spaces", () => {
      expect(esc("line 1\nline 2")).toBe("line 1 line 2");
      expect(esc("line 1\r\nline 2")).toBe("line 1 line 2");
    });

    it("should handle mixed inputs", () => {
      expect(esc("foo | <bar> `baz` \\qux\nline 2")).toBe(
        "foo \\| &lt;bar&gt; \\`baz\\` \\\\qux line 2",
      );
    });
  });

  describe("codeInline helper function", () => {
    it("should wrap value in backticks", () => {
      expect(codeInline("foo")).toBe("`foo`");
    });
  });

  describe("toSchema helper function", () => {
    it("should convert Zod schema to JSON schema", () => {
      const schema = z.object({
        foo: z.string().describe("a string"),
      });
      const jsonSchema = toSchema(schema);
      expect(jsonSchema.type).toBe("object");
      expect(jsonSchema.properties).toBeDefined();
      expect(jsonSchema.properties?.foo.type).toBe("string");
    });
  });

  describe("describeType helper function", () => {
    it("should return unknown for undefined", () => {
      expect(describeType(undefined)).toBe("unknown");
    });

    it("should handle $ref", () => {
      expect(describeType({ $ref: "#/definitions/Foo" })).toBe("Foo");
    });

    it("should handle const", () => {
      expect(describeType({ const: "foo" })).toBe('`"foo"`');
    });

    it("should handle enum", () => {
      expect(describeType({ enum: ["a", "b"] })).toBe('`"a"` \\| `"b"`');
    });

    it("should handle anyOf", () => {
      expect(
        describeType({ anyOf: [{ type: "string" }, { type: "number" }] }),
      ).toBe("string \\| number");
    });

    it("should handle oneOf", () => {
      expect(
        describeType({ oneOf: [{ type: "string" }, { type: "number" }] }),
      ).toBe("string \\| number");
    });

    it("should handle allOf", () => {
      expect(
        describeType({ allOf: [{ type: "string" }, { type: "number" }] }),
      ).toBe("string & number");
    });

    it("should handle arrays", () => {
      expect(describeType({ type: "array", items: { type: "string" } })).toBe(
        "string[]",
      );
    });

    it("should handle simple types", () => {
      expect(describeType({ type: "string" })).toBe("string");
    });

    it("should handle mixed types", () => {
      expect(describeType({ type: ["string", "number"] })).toBe(
        "string \\| number",
      );
    });

    it("should handle object with properties", () => {
      expect(
        describeType({
          type: "object",
          properties: { foo: { type: "string" } },
        }),
      ).toBe("object");
    });
  });
});
