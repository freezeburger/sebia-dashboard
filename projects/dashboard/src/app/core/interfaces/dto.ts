export type ReviewStatus = "VALIDATED" | "SKIPPED";

/**
 * Une review est maintenant strictement un artefact
 * rattaché au cycle de validation d'une Analysis.
 * Elle ne connaît plus son parent.
 */
export interface ReviewDTO {
  /**
   * Identifiant unique de la review.
   */
  id: string;

  /**
   * "VALIDATED" ou "SKIPPED"
   */
  status: ReviewStatus;

  /**
   * Commentaire libre du réviseur.
   */
  comment?: string;

  /**
   * Identité (ou login) de la personne qui a effectué la revue.
   */
  reviewer?: string;

  /**
   * Horodatage ISO 8601.
   */
  reviewedAt: string;
}

/**
 * L'analyse devient la racine d'agrégat :
 * - Elle porte sa liste de reviews.
 * - C'est elle qu'on charge / sauvegarde.
 */
export interface AnalysisDTO {
  /**
   * Identifiant unique de l'analyse.
   */
  id: string;

  /**
   * Libellé humain.
   */
  label: string;

  /**
   * Résultats bruts ou structurés.
   */
  results: unknown;

  /**
   * Statut global métier de l'analyse (optionnel).
   * Ex: "PENDING_REVIEW", "ACCEPTED", "FLAGGED", etc.
   */
  status?: string;

  /**
   * Horodatage de création de l'analyse.
   */
  createdAt: string;

  /**
   * Historique des actions de revue faites sur cette analyse.
   * La corrélation est donc portée ici.
   */
  reviews?: ReviewDTO[];
}