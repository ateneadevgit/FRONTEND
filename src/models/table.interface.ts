/**
 * Table interface
 * header: name of table
 * columns: array of columns
 */
export interface Table {
  header?: string;
  columns?: Columns[];
  rows?: Rows[];
}

/**
 * Columns interface
 * type: Enum TypeColumn
 * name: name of thead
 */
export interface Columns {
  attribute?: string;
  type?: 'image' | 'text' | 'number' | 'custom';
  name?: string;
}

/**
 * Columns interface
 * type: Enum TypeColumn
 * name: name of thead
 */
export interface Rows {
  attribute?: string;
  name?: string;
}
