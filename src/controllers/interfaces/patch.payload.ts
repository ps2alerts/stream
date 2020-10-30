export interface PatchPayload {
  /**
   * Name of the entity that is updated
   */
  entity: string,

  /**
   * Updated parameters of the entity
   */
  payload: any,
}
