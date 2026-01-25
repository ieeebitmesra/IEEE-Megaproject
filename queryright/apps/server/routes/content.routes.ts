import type { FastifyPluginAsync } from "fastify";
import { prisma } from "@/utils/db.js";
import { HighlightSchema } from "@repo/schema";
import { z } from "zod";
import { requireAuth } from "@/utils/functions.js";
import { logger } from "@/index.js";

const contentRoutes: FastifyPluginAsync = async (app) => {
  // Get all highlights for the authenticated user with content trimmed
  app.get("/highlights", async (request, reply) => {
    try {
      const user = await requireAuth(request, reply);
      if (!user) return;

      const highlights = await prisma.highlight.findMany({
        where: {
          userId: user.id,
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      const trimmedHighlights = highlights.map((h) => {
        const content = h.content as Record<string, unknown>;
        return {
          id: h.id,
          courseId: h.courseId,
          ...content,
          text:
            (typeof content.text === "string"
              ? content.text.substring(0, 100)
              : "") +
            (typeof content.text === "string" && content.text.length > 100
              ? "..."
              : ""),
          createdAt: h.createdAt,
        };
      });

      return reply.send({ highlights: trimmedHighlights });
    } catch (error) {
      logger.error(error);
      return reply.code(500).send({ error: "Failed to fetch highlights" });
    }
  });

  // Get highlights for a specific course
  app.get<{
    Params: { courseId: string };
  }>("/highlights/:courseId", async (request, reply) => {
    try {
      const user = await requireAuth(request, reply);
      if (!user) return;

      const { courseId } = request.params;

      const highlights = await prisma.highlight.findMany({
        where: {
          userId: user.id,
          courseId,
        },
        orderBy: {
          createdAt: "asc",
        },
      });

      const parsedHighlights = highlights.map((h) => ({
        id: h.id,
        ...(h.content as object),
      }));

      return reply.send({ highlights: parsedHighlights });
    } catch (error) {
      logger.error(error);
      return reply.code(500).send({ error: "Failed to fetch highlights" });
    }
  });

  app.post<{
    Body: z.infer<typeof HighlightSchema>;
  }>("/highlights", async (request, reply) => {
    try {
      const user = await requireAuth(request, reply);
      if (!user) return;

      const highlightData = request.body;

      logger.info({ highlightData }, "Received highlight data");

      const validatedData = HighlightSchema.parse(highlightData);

      const highlight = await prisma.highlight.create({
        data: {
          userId: user.id,
          courseId: validatedData.courseId || "",
          content: {
            text: validatedData.text,
            color: validatedData.color,
            range: validatedData.range,
          },
        },
      });

      return reply.code(201).send({
        id: highlight.id,
        message: "Highlight created successfully",
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        logger.error({ errors: error.issues }, "Validation error");
        return reply.code(400).send({
          error: "Validation failed",
          details: error.issues,
        });
      }
      logger.error(error);
      return reply.code(500).send({ error: "Failed to create highlight" });
    }
  });

  app.delete<{
    Body: { id: string };
  }>("/highlights", async (request, reply) => {
    try {
      const user = await requireAuth(request, reply);
      if (!user) return;

      const { id } = request.body;

      if (!id) {
        return reply.code(400).send({ error: "Highlight id is required" });
      }

      const highlight = await prisma.highlight.findFirst({
        where: {
          id,
          userId: user.id,
        },
      });

      if (!highlight) {
        return reply.code(404).send({ error: "Highlight not found" });
      }

      await prisma.highlight.delete({
        where: { id },
      });

      return reply.send({ message: "Highlight deleted successfully" });
    } catch (error) {
      logger.error(error);
      return reply.code(500).send({ error: "Failed to delete highlight" });
    }
  });

  // Get all bookmarks for the authenticated user
  app.get("/bookmarks", async (request, reply) => {
    try {
      const user = await requireAuth(request, reply);
      if (!user) return;

      const bookmarks = await prisma.bookmark.findMany({
        where: {
          userId: user.id,
        },
        orderBy: {
          id: "desc",
        },
      });

      return reply.send({ bookmarks });
    } catch (error) {
      logger.error(error);
      return reply.code(500).send({ error: "Failed to fetch bookmarks" });
    }
  });

  // Check if a course is bookmarked
  app.get<{
    Params: { courseId: string };
  }>("/bookmarks/:courseId", async (request, reply) => {
    try {
      const user = await requireAuth(request, reply);
      if (!user) return;

      const { courseId } = request.params;

      const bookmark = await prisma.bookmark.findFirst({
        where: {
          userId: user.id,
          courseId,
        },
      });

      return reply.send({
        isBookmarked: !!bookmark,
        bookmark: bookmark || null,
      });
    } catch (error) {
      logger.error(error);
      return reply.code(500).send({ error: "Failed to check bookmark status" });
    }
  });

  // Create a bookmark
  app.post<{
    Body: { courseId: string };
  }>("/bookmarks", async (request, reply) => {
    try {
      const user = await requireAuth(request, reply);
      if (!user) return;

      const { courseId } = request.body;

      if (!courseId) {
        return reply.code(400).send({ error: "Course ID is required" });
      }

      // Check if already bookmarked
      const existingBookmark = await prisma.bookmark.findFirst({
        where: {
          userId: user.id,
          courseId,
        },
      });

      if (existingBookmark) {
        return reply.code(409).send({
          error: "Course already bookmarked",
          bookmark: existingBookmark,
        });
      }

      const bookmark = await prisma.bookmark.create({
        data: {
          userId: user.id,
          courseId,
        },
      });

      return reply.code(201).send({
        bookmark,
        message: "Bookmark created successfully",
      });
    } catch (error) {
      logger.error(error);
      return reply.code(500).send({ error: "Failed to create bookmark" });
    }
  });

  // Delete a bookmark by courseId
  app.delete<{
    Body: { courseId: string };
  }>("/bookmarks", async (request, reply) => {
    try {
      const user = await requireAuth(request, reply);
      if (!user) return;

      const { courseId } = request.body;

      if (!courseId) {
        return reply.code(400).send({ error: "Course ID is required" });
      }

      const bookmark = await prisma.bookmark.findFirst({
        where: {
          courseId,
          userId: user.id,
        },
      });

      if (!bookmark) {
        return reply.code(404).send({ error: "Bookmark not found" });
      }

      await prisma.bookmark.delete({
        where: { id: bookmark.id },
      });

      return reply.send({ message: "Bookmark deleted successfully" });
    } catch (error) {
      logger.error(error);
      return reply.code(500).send({ error: "Failed to delete bookmark" });
    }
  });
};

export default contentRoutes;
