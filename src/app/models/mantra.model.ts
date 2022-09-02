import { Audit } from "./shared.models";

export class Mantra {
  version: string;
  vedaId: string;
  vedaCode: string;
  code: string;
  seqNo: string;
  displayOrder: number;
  title: string;
  header: string;
  mantra: string;
  mantraOriginal: string;
  footer: string;
  summary: string;
  videoId: string;
  audioId: string;
  metadata: Metadata;
  padaArtha?: (PadaArthaEntity)[] | null;
  artha: string;
  detailedArtha: string;
  audit: Audit;
}
export class Metadata {
  mandal: string;
  sukta: string;
  anuvaka: string;
  devatha: string;
  rishi: string;
  chandas: string;
  swar: string;
}
export class PadaArthaEntity {
  padha: string;
  artha: string;
  sourceIds: string;
  audioId: string;
  displayOrder: number;
}

