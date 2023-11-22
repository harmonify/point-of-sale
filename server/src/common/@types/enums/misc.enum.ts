export const enum Server {
  SES = 'SES',
  SMTP = 'SMTP',
}

const BITS_TO_MB = 1024 * 1024;

export enum FileSize {
  IMAGE = 5 * BITS_TO_MB, // 5MB
  DOC = 10 * BITS_TO_MB, // 10MB
}

export const FileType: Record<keyof typeof FileSize, RegExp> = {
  IMAGE: /(jpg|jpeg|png|gif|svg)$/i,
  DOC: /(pdf|doc|txt|key|csv|docx|xls|xlsx|ppt|pptx)$/i,
};
