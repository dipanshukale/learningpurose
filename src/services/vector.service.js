import { QdrantVectorStore } from "@langchain/qdrant";
import { qdrantClient } from "../db/vector.db.js";
import { embeddings } from "./embedding.service.js";

export const getVectorStore = async () => {
  return await QdrantVectorStore.fromExistingCollection(
    embeddings,
    {
      client: qdrantClient,
      collectionName: "personal-backend-knowledge",
    }
  );
};

