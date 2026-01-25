import type { languages } from 'monaco-editor'

export type SQLSuggestion = {
  label: string
  kind: languages.CompletionItemKind
  insertText: string
  insertTextRules?: languages.CompletionItemInsertTextRule
  documentation: string
  detail?: string
}

export const sqlSuggestions: Array<SQLSuggestion> = [
  // ===== SELECT QUERIES =====
  {
    label: 'SELECT',
    kind: 14, // Keyword
    insertText: 'SELECT ${1:*} FROM ${2:table}',
    insertTextRules: 4, // InsertAsSnippet
    documentation: 'Retrieve data from a table',
    detail: 'Basic SELECT statement',
  },
  {
    label: 'SELECT DISTINCT',
    kind: 15, // Snippet
    insertText: 'SELECT DISTINCT ${1:column} FROM ${2:table}',
    insertTextRules: 4,
    documentation: 'Select unique values from a column, removing duplicates',
    detail: 'Returns only distinct (different) values',
  },
  {
    label: 'SELECT with WHERE',
    kind: 15,
    insertText: 'SELECT ${1:*}\nFROM ${2:table}\nWHERE ${3:condition}',
    insertTextRules: 4,
    documentation: 'Select data with a filtering condition',
    detail: 'Filter rows based on a condition',
  },
  {
    label: 'SELECT with multiple conditions',
    kind: 15,
    insertText:
      'SELECT ${1:*}\nFROM ${2:table}\nWHERE ${3:condition1}\n  AND ${4:condition2}\n  OR ${5:condition3}',
    insertTextRules: 4,
    documentation: 'Select with multiple AND/OR conditions',
    detail: 'Combine multiple conditions with AND/OR',
  },
  {
    label: 'SELECT with INNER JOIN',
    kind: 15,
    insertText:
      'SELECT ${1:a.*}, ${2:b.*}\nFROM ${3:table_a} a\nINNER JOIN ${4:table_b} b ON a.${5:id} = b.${6:id}',
    insertTextRules: 4,
    documentation: 'Select data from two tables using INNER JOIN',
    detail: 'Returns rows when there is a match in both tables',
  },
  {
    label: 'SELECT with LEFT JOIN',
    kind: 15,
    insertText:
      'SELECT ${1:a.*}, ${2:b.*}\nFROM ${3:table_a} a\nLEFT JOIN ${4:table_b} b ON a.${5:id} = b.${6:id}',
    insertTextRules: 4,
    documentation:
      'Select all rows from left table and matching rows from right table',
    detail: 'Returns all rows from left table, NULL for non-matches',
  },
  {
    label: 'SELECT with RIGHT JOIN',
    kind: 15,
    insertText:
      'SELECT ${1:a.*}, ${2:b.*}\nFROM ${3:table_a} a\nRIGHT JOIN ${4:table_b} b ON a.${5:id} = b.${6:id}',
    insertTextRules: 4,
    documentation:
      'Select all rows from right table and matching rows from left table',
    detail: 'Returns all rows from right table, NULL for non-matches',
  },
  {
    label: 'SELECT with FULL OUTER JOIN',
    kind: 15,
    insertText:
      'SELECT ${1:a.*}, ${2:b.*}\nFROM ${3:table_a} a\nFULL OUTER JOIN ${4:table_b} b ON a.${5:id} = b.${6:id}',
    insertTextRules: 4,
    documentation:
      'Select all rows from both tables with matches where available',
    detail: 'Returns all rows from both tables, NULL for non-matches',
  },
  {
    label: 'SELECT with CROSS JOIN',
    kind: 15,
    insertText:
      'SELECT ${1:a.*}, ${2:b.*}\nFROM ${3:table_a} a\nCROSS JOIN ${4:table_b} b',
    insertTextRules: 4,
    documentation: 'Cartesian product of two tables',
    detail: 'Returns all possible combinations of rows',
  },
  {
    label: 'SELECT with SELF JOIN',
    kind: 15,
    insertText:
      'SELECT ${1:a.*}, ${2:b.*}\nFROM ${3:table} a\nJOIN ${3:table} b ON a.${4:parent_id} = b.${5:id}',
    insertTextRules: 4,
    documentation: 'Join a table to itself',
    detail: 'Useful for hierarchical data or comparing rows within same table',
  },
  {
    label: 'SELECT with multiple JOINs',
    kind: 15,
    insertText:
      'SELECT ${1:*}\nFROM ${2:table_a} a\nINNER JOIN ${3:table_b} b ON a.${4:id} = b.${5:a_id}\nINNER JOIN ${6:table_c} c ON b.${7:id} = c.${8:b_id}',
    insertTextRules: 4,
    documentation: 'Select data from multiple related tables',
    detail: 'Chain multiple JOIN operations',
  },
  {
    label: 'SELECT with GROUP BY',
    kind: 15,
    insertText:
      'SELECT ${1:column}, COUNT(*)\nFROM ${2:table}\nGROUP BY ${1:column}',
    insertTextRules: 4,
    documentation: 'Group rows that have the same values into summary rows',
    detail: 'Typically used with aggregate functions',
  },
  {
    label: 'SELECT with GROUP BY and HAVING',
    kind: 15,
    insertText:
      'SELECT ${1:column}, COUNT(*) as count\nFROM ${2:table}\nGROUP BY ${1:column}\nHAVING count > ${3:1}',
    insertTextRules: 4,
    documentation: 'Group rows and filter groups based on aggregate conditions',
    detail: 'HAVING filters groups, WHERE filters rows',
  },
  {
    label: 'SELECT with ORDER BY',
    kind: 15,
    insertText:
      'SELECT ${1:*}\nFROM ${2:table}\nORDER BY ${3:column} ${4|ASC,DESC|}',
    insertTextRules: 4,
    documentation: 'Sort result set by one or more columns',
    detail: 'ASC = ascending (default), DESC = descending',
  },
  {
    label: 'SELECT with LIMIT and OFFSET',
    kind: 15,
    insertText: 'SELECT ${1:*}\nFROM ${2:table}\nLIMIT ${3:10} OFFSET ${4:0}',
    insertTextRules: 4,
    documentation: 'Limit number of results and skip rows (pagination)',
    detail: 'LIMIT = max rows, OFFSET = skip rows',
  },
  {
    label: 'SELECT with subquery in WHERE',
    kind: 15,
    insertText:
      'SELECT ${1:*}\nFROM ${2:table}\nWHERE ${3:column} IN (\n  SELECT ${4:id}\n  FROM ${5:other_table}\n  WHERE ${6:condition}\n)',
    insertTextRules: 4,
    documentation: 'Use subquery to filter results',
    detail: 'Subquery returns values for filtering',
  },
  {
    label: 'SELECT with subquery in FROM',
    kind: 15,
    insertText:
      'SELECT ${1:*}\nFROM (\n  SELECT ${2:*}\n  FROM ${3:table}\n  WHERE ${4:condition}\n) AS ${5:subquery_alias}',
    insertTextRules: 4,
    documentation: 'Use subquery as a table source',
    detail: 'Subquery must have an alias',
  },
  {
    label: 'SELECT with UNION',
    kind: 15,
    insertText:
      'SELECT ${1:column}\nFROM ${2:table1}\nUNION\nSELECT ${1:column}\nFROM ${3:table2}',
    insertTextRules: 4,
    documentation:
      'Combine results from multiple SELECT statements (removes duplicates)',
    detail: 'Columns must match in number and type',
  },
  {
    label: 'SELECT with UNION ALL',
    kind: 15,
    insertText:
      'SELECT ${1:column}\nFROM ${2:table1}\nUNION ALL\nSELECT ${1:column}\nFROM ${3:table2}',
    insertTextRules: 4,
    documentation:
      'Combine results from multiple SELECT statements (keeps duplicates)',
    detail: 'Faster than UNION as it does not remove duplicates',
  },
  {
    label: 'SELECT with EXISTS',
    kind: 15,
    insertText:
      'SELECT ${1:*}\nFROM ${2:table} a\nWHERE EXISTS (\n  SELECT 1\n  FROM ${3:other_table} b\n  WHERE b.${4:id} = a.${5:id}\n)',
    insertTextRules: 4,
    documentation: 'Check if subquery returns any rows',
    detail: 'More efficient than IN for checking existence',
  },
  {
    label: 'SELECT with Common Table Expression (CTE)',
    kind: 15,
    insertText:
      'WITH ${1:cte_name} AS (\n  SELECT ${2:*}\n  FROM ${3:table}\n  WHERE ${4:condition}\n)\nSELECT ${5:*}\nFROM ${1:cte_name}',
    insertTextRules: 4,
    documentation: 'Define a temporary named result set (CTE)',
    detail: 'Makes complex queries more readable',
  },
  {
    label: 'SELECT with Recursive CTE',
    kind: 15,
    insertText:
      'WITH RECURSIVE ${1:cte_name}(${2:id}, ${3:level}) AS (\n  -- Base case\n  SELECT ${2:id}, 1\n  FROM ${4:table}\n  WHERE ${5:parent_id} IS NULL\n  \n  UNION ALL\n  \n  -- Recursive case\n  SELECT t.${2:id}, c.${3:level} + 1\n  FROM ${4:table} t\n  JOIN ${1:cte_name} c ON t.${5:parent_id} = c.${2:id}\n)\nSELECT * FROM ${1:cte_name}',
    insertTextRules: 4,
    documentation: 'Recursive CTE for hierarchical or tree-structured data',
    detail: 'Useful for organizational charts, file systems, etc.',
  },

  // ===== INSERT STATEMENTS =====
  {
    label: 'INSERT',
    kind: 14,
    insertText: 'INSERT INTO ${1:table} (${2:columns})\nVALUES (${3:values})',
    insertTextRules: 4,
    documentation: 'Insert a single row into a table',
    detail: 'Add new data to a table',
  },
  {
    label: 'INSERT multiple rows',
    kind: 15,
    insertText:
      'INSERT INTO ${1:table} (${2:columns})\nVALUES\n  (${3:values1}),\n  (${4:values2}),\n  (${5:values3})',
    insertTextRules: 4,
    documentation: 'Insert multiple rows in a single statement',
    detail: 'More efficient than multiple INSERT statements',
  },
  {
    label: 'INSERT from SELECT',
    kind: 15,
    insertText:
      'INSERT INTO ${1:target_table} (${2:columns})\nSELECT ${3:columns}\nFROM ${4:source_table}\nWHERE ${5:condition}',
    insertTextRules: 4,
    documentation: 'Insert data from another table or query',
    detail: 'Copy data between tables',
  },
  {
    label: 'INSERT OR REPLACE',
    kind: 15,
    insertText:
      'INSERT OR REPLACE INTO ${1:table} (${2:columns})\nVALUES (${3:values})',
    insertTextRules: 4,
    documentation: 'Insert or replace existing row if conflict occurs',
    detail: 'SQLite specific: replace row on conflict',
  },
  {
    label: 'INSERT OR IGNORE',
    kind: 15,
    insertText:
      'INSERT OR IGNORE INTO ${1:table} (${2:columns})\nVALUES (${3:values})',
    insertTextRules: 4,
    documentation: 'Insert only if no conflict, otherwise ignore',
    detail: 'Prevents duplicate key errors',
  },

  // ===== UPDATE STATEMENTS =====
  {
    label: 'UPDATE',
    kind: 14,
    insertText:
      'UPDATE ${1:table}\nSET ${2:column} = ${3:value}\nWHERE ${4:condition}',
    insertTextRules: 4,
    documentation: 'Update existing records in a table',
    detail: 'Always use WHERE to avoid updating all rows',
  },
  {
    label: 'UPDATE multiple columns',
    kind: 15,
    insertText:
      'UPDATE ${1:table}\nSET\n  ${2:column1} = ${3:value1},\n  ${4:column2} = ${5:value2},\n  ${6:column3} = ${7:value3}\nWHERE ${8:condition}',
    insertTextRules: 4,
    documentation: 'Update multiple columns in a single statement',
    detail: 'Set multiple columns at once',
  },
  {
    label: 'UPDATE with JOIN',
    kind: 15,
    insertText:
      'UPDATE ${1:table_a}\nSET ${2:column} = ${3:value}\nFROM ${4:table_b}\nWHERE ${1:table_a}.${5:id} = ${4:table_b}.${6:id}\n  AND ${7:condition}',
    insertTextRules: 4,
    documentation: 'Update based on values from another table',
    detail: 'Use JOIN to update with related data',
  },
  {
    label: 'UPDATE with subquery',
    kind: 15,
    insertText:
      'UPDATE ${1:table}\nSET ${2:column} = (\n  SELECT ${3:value}\n  FROM ${4:other_table}\n  WHERE ${5:condition}\n)\nWHERE ${6:condition}',
    insertTextRules: 4,
    documentation: 'Update using values from a subquery',
    detail: 'Calculate new values from other tables',
  },
  {
    label: 'UPDATE increment value',
    kind: 15,
    insertText:
      'UPDATE ${1:table}\nSET ${2:column} = ${2:column} + ${3:1}\nWHERE ${4:condition}',
    insertTextRules: 4,
    documentation: 'Increment a numeric column',
    detail: 'Useful for counters, scores, etc.',
  },

  // ===== DELETE STATEMENTS =====
  {
    label: 'DELETE',
    kind: 14,
    insertText: 'DELETE FROM ${1:table}\nWHERE ${2:condition}',
    insertTextRules: 4,
    documentation: 'Delete records from a table',
    detail: 'Always use WHERE to avoid deleting all rows',
  },
  {
    label: 'DELETE with JOIN',
    kind: 15,
    insertText:
      'DELETE FROM ${1:table_a}\nWHERE ${2:id} IN (\n  SELECT ${3:id}\n  FROM ${4:table_b}\n  WHERE ${5:condition}\n)',
    insertTextRules: 4,
    documentation: 'Delete records based on data from another table',
    detail: 'Use subquery for conditional deletion',
  },
  {
    label: 'DELETE all rows',
    kind: 15,
    insertText: 'DELETE FROM ${1:table}',
    insertTextRules: 4,
    documentation: 'Delete all rows from a table (use with caution!)',
    detail: 'WARNING: This deletes ALL data',
  },

  // ===== CREATE TABLE =====
  {
    label: 'CREATE TABLE',
    kind: 15,
    insertText:
      'CREATE TABLE ${1:table_name} (\n  ${2:id} INTEGER PRIMARY KEY AUTOINCREMENT,\n  ${3:column1} ${4:TEXT} NOT NULL,\n  ${5:column2} ${6:INTEGER},\n  ${7:created_at} DATETIME DEFAULT CURRENT_TIMESTAMP\n)',
    insertTextRules: 4,
    documentation: 'Create a new table with columns and constraints',
    detail: 'Define table structure',
  },
  {
    label: 'CREATE TABLE with Foreign Key',
    kind: 15,
    insertText:
      'CREATE TABLE ${1:table_name} (\n  ${2:id} INTEGER PRIMARY KEY AUTOINCREMENT,\n  ${3:column} ${4:TEXT} NOT NULL,\n  ${5:foreign_id} INTEGER NOT NULL,\n  FOREIGN KEY (${5:foreign_id}) REFERENCES ${6:other_table}(${7:id})\n    ON DELETE ${8|CASCADE,SET NULL,RESTRICT|}\n    ON UPDATE ${9|CASCADE,SET NULL,RESTRICT|}\n)',
    insertTextRules: 4,
    documentation: 'Create table with foreign key relationship',
    detail: 'Define relationships between tables',
  },
  {
    label: 'CREATE TABLE with UNIQUE constraint',
    kind: 15,
    insertText:
      'CREATE TABLE ${1:table_name} (\n  ${2:id} INTEGER PRIMARY KEY AUTOINCREMENT,\n  ${3:email} TEXT NOT NULL UNIQUE,\n  ${4:username} TEXT NOT NULL,\n  UNIQUE(${4:username})\n)',
    insertTextRules: 4,
    documentation: 'Create table with unique constraints',
    detail: 'Ensure column values are unique',
  },
  {
    label: 'CREATE TABLE with CHECK constraint',
    kind: 15,
    insertText:
      'CREATE TABLE ${1:table_name} (\n  ${2:id} INTEGER PRIMARY KEY AUTOINCREMENT,\n  ${3:age} INTEGER CHECK(${3:age} >= ${4:0}),\n  ${5:price} REAL CHECK(${5:price} > ${6:0})\n)',
    insertTextRules: 4,
    documentation: 'Create table with CHECK constraints for validation',
    detail: 'Enforce data validation rules',
  },
  {
    label: 'CREATE TABLE IF NOT EXISTS',
    kind: 15,
    insertText:
      'CREATE TABLE IF NOT EXISTS ${1:table_name} (\n  ${2:id} INTEGER PRIMARY KEY AUTOINCREMENT,\n  ${3:column} ${4:TEXT} NOT NULL\n)',
    insertTextRules: 4,
    documentation: 'Create table only if it does not exist',
    detail: 'Prevents error if table already exists',
  },
  {
    label: 'CREATE TEMPORARY TABLE',
    kind: 15,
    insertText:
      'CREATE TEMPORARY TABLE ${1:temp_table} (\n  ${2:column} ${3:TEXT}\n)',
    insertTextRules: 4,
    documentation: 'Create a temporary table (deleted when session ends)',
    detail: 'Useful for intermediate calculations',
  },

  // ===== ALTER TABLE =====
  {
    label: 'ALTER TABLE ADD COLUMN',
    kind: 15,
    insertText:
      'ALTER TABLE ${1:table_name}\nADD COLUMN ${2:column_name} ${3:data_type}${4: NOT NULL DEFAULT ${5:default_value}}',
    insertTextRules: 4,
    documentation: 'Add a new column to an existing table',
    detail: 'Modify table structure',
  },
  {
    label: 'ALTER TABLE RENAME TO',
    kind: 15,
    insertText: 'ALTER TABLE ${1:old_name}\nRENAME TO ${2:new_name}',
    insertTextRules: 4,
    documentation: 'Rename a table',
    detail: 'Change table name',
  },
  {
    label: 'ALTER TABLE RENAME COLUMN',
    kind: 15,
    insertText:
      'ALTER TABLE ${1:table_name}\nRENAME COLUMN ${2:old_name} TO ${3:new_name}',
    insertTextRules: 4,
    documentation: 'Rename a column in a table',
    detail: 'Change column name',
  },
  {
    label: 'ALTER TABLE DROP COLUMN',
    kind: 15,
    insertText: 'ALTER TABLE ${1:table_name}\nDROP COLUMN ${2:column_name}',
    insertTextRules: 4,
    documentation: 'Remove a column from a table',
    detail: 'Delete column and its data',
  },

  // ===== DROP STATEMENTS =====
  {
    label: 'DROP TABLE',
    kind: 14,
    insertText: 'DROP TABLE IF EXISTS ${1:table_name}',
    insertTextRules: 4,
    documentation: 'Delete a table and all its data',
    detail: 'WARNING: Permanently deletes table',
  },
  {
    label: 'DROP INDEX',
    kind: 15,
    insertText: 'DROP INDEX IF EXISTS ${1:index_name}',
    insertTextRules: 4,
    documentation: 'Delete an index',
    detail: 'Remove index from database',
  },
  {
    label: 'DROP VIEW',
    kind: 15,
    insertText: 'DROP VIEW IF EXISTS ${1:view_name}',
    insertTextRules: 4,
    documentation: 'Delete a view',
    detail: 'Remove saved query',
  },
  {
    label: 'DROP TRIGGER',
    kind: 15,
    insertText: 'DROP TRIGGER IF EXISTS ${1:trigger_name}',
    insertTextRules: 4,
    documentation: 'Delete a trigger',
    detail: 'Remove automatic action',
  },

  // ===== INDEX =====
  {
    label: 'CREATE INDEX',
    kind: 15,
    insertText:
      'CREATE INDEX ${1:index_name}\nON ${2:table_name} (${3:column})',
    insertTextRules: 4,
    documentation: 'Create an index to improve query performance',
    detail: 'Speeds up SELECT queries on indexed columns',
  },
  {
    label: 'CREATE UNIQUE INDEX',
    kind: 15,
    insertText:
      'CREATE UNIQUE INDEX ${1:index_name}\nON ${2:table_name} (${3:column})',
    insertTextRules: 4,
    documentation: 'Create a unique index ensuring column uniqueness',
    detail: 'Index + uniqueness constraint',
  },
  {
    label: 'CREATE COMPOSITE INDEX',
    kind: 15,
    insertText:
      'CREATE INDEX ${1:index_name}\nON ${2:table_name} (${3:column1}, ${4:column2}, ${5:column3})',
    insertTextRules: 4,
    documentation: 'Create an index on multiple columns',
    detail: 'Useful for queries filtering on multiple columns',
  },
  {
    label: 'CREATE PARTIAL INDEX',
    kind: 15,
    insertText:
      'CREATE INDEX ${1:index_name}\nON ${2:table_name} (${3:column})\nWHERE ${4:condition}',
    insertTextRules: 4,
    documentation: 'Create an index on a subset of rows',
    detail: 'Only indexes rows matching the condition',
  },

  // ===== VIEW =====
  {
    label: 'CREATE VIEW',
    kind: 15,
    insertText:
      'CREATE VIEW ${1:view_name} AS\nSELECT ${2:*}\nFROM ${3:table}\nWHERE ${4:condition}',
    insertTextRules: 4,
    documentation: 'Create a virtual table based on a query',
    detail: 'Saves complex queries for reuse',
  },
  {
    label: 'CREATE VIEW with JOIN',
    kind: 15,
    insertText:
      'CREATE VIEW ${1:view_name} AS\nSELECT ${2:*}\nFROM ${3:table_a} a\nJOIN ${4:table_b} b ON a.${5:id} = b.${6:id}',
    insertTextRules: 4,
    documentation: 'Create a view combining data from multiple tables',
    detail: 'Simplify complex joins',
  },

  // ===== TRIGGER =====
  {
    label: 'CREATE TRIGGER BEFORE INSERT',
    kind: 15,
    insertText:
      "CREATE TRIGGER ${1:trigger_name}\nBEFORE INSERT ON ${2:table_name}\nFOR EACH ROW\nBEGIN\n  ${3:-- trigger logic}\n  ${4:SELECT RAISE(ABORT, 'Error message')}\n  ${5:-- WHERE NEW.column condition;}\nEND",
    insertTextRules: 4,
    documentation: 'Create a trigger that fires before INSERT operations',
    detail: 'Execute code automatically on insert',
  },
  {
    label: 'CREATE TRIGGER AFTER INSERT',
    kind: 15,
    insertText:
      'CREATE TRIGGER ${1:trigger_name}\nAFTER INSERT ON ${2:table_name}\nFOR EACH ROW\nBEGIN\n  ${3:-- trigger logic using NEW.column}\n  UPDATE ${4:audit_table}\n  SET ${5:count} = ${5:count} + 1;\nEND',
    insertTextRules: 4,
    documentation: 'Create a trigger that fires after INSERT operations',
    detail: 'Useful for auditing and logging',
  },
  {
    label: 'CREATE TRIGGER BEFORE UPDATE',
    kind: 15,
    insertText:
      'CREATE TRIGGER ${1:trigger_name}\nBEFORE UPDATE ON ${2:table_name}\nFOR EACH ROW\nBEGIN\n  ${3:-- Access OLD and NEW values}\n  UPDATE ${2:table_name}\n  SET ${4:updated_at} = CURRENT_TIMESTAMP\n  WHERE ${5:id} = NEW.${5:id};\nEND',
    insertTextRules: 4,
    documentation: 'Create a trigger that fires before UPDATE operations',
    detail: 'Validate or modify data before update',
  },
  {
    label: 'CREATE TRIGGER AFTER DELETE',
    kind: 15,
    insertText:
      'CREATE TRIGGER ${1:trigger_name}\nAFTER DELETE ON ${2:table_name}\nFOR EACH ROW\nBEGIN\n  ${3:-- Use OLD values to log deletion}\n  INSERT INTO ${4:deleted_log} (${5:id}, ${6:deleted_at})\n  VALUES (OLD.${5:id}, CURRENT_TIMESTAMP);\nEND',
    insertTextRules: 4,
    documentation: 'Create a trigger that fires after DELETE operations',
    detail: 'Archive or log deleted records',
  },

  // ===== TRANSACTION =====
  {
    label: 'BEGIN TRANSACTION',
    kind: 15,
    insertText:
      'BEGIN TRANSACTION;\n\n${1:-- Your SQL statements here}\n\nCOMMIT;',
    insertTextRules: 4,
    documentation: 'Start a transaction for multiple operations',
    detail: 'Ensures atomicity: all succeed or all fail',
  },
  {
    label: 'TRANSACTION with ROLLBACK',
    kind: 15,
    insertText:
      'BEGIN TRANSACTION;\n\n${1:-- Your SQL statements}\n\n-- If error occurs:\nROLLBACK;\n-- Or if success:\nCOMMIT;',
    insertTextRules: 4,
    documentation: 'Transaction with rollback capability',
    detail: 'ROLLBACK undoes all changes since BEGIN',
  },
  {
    label: 'SAVEPOINT',
    kind: 15,
    insertText:
      'BEGIN TRANSACTION;\n\n${1:-- statements}\n\nSAVEPOINT ${2:savepoint_name};\n\n${3:-- more statements}\n\n-- Rollback to savepoint if needed:\nROLLBACK TO ${2:savepoint_name};\n\nCOMMIT;',
    insertTextRules: 4,
    documentation: 'Create a savepoint within a transaction',
    detail: 'Allows partial rollback',
  },

  // ===== AGGREGATE FUNCTIONS =====
  {
    label: 'COUNT',
    kind: 3, // Function
    insertText: 'COUNT(${1:*})',
    insertTextRules: 4,
    documentation: 'Count the number of rows',
    detail: 'COUNT(*) includes NULL values',
  },
  {
    label: 'COUNT DISTINCT',
    kind: 3,
    insertText: 'COUNT(DISTINCT ${1:column})',
    insertTextRules: 4,
    documentation: 'Count unique values in a column',
    detail: 'Excludes duplicates and NULL',
  },
  {
    label: 'SUM',
    kind: 3,
    insertText: 'SUM(${1:column})',
    insertTextRules: 4,
    documentation: 'Calculate the sum of numeric values',
    detail: 'Ignores NULL values',
  },
  {
    label: 'AVG',
    kind: 3,
    insertText: 'AVG(${1:column})',
    insertTextRules: 4,
    documentation: 'Calculate the average of numeric values',
    detail: 'Ignores NULL values',
  },
  {
    label: 'MAX',
    kind: 3,
    insertText: 'MAX(${1:column})',
    insertTextRules: 4,
    documentation: 'Find the maximum value',
    detail: 'Works with numbers, dates, and strings',
  },
  {
    label: 'MIN',
    kind: 3,
    insertText: 'MIN(${1:column})',
    insertTextRules: 4,
    documentation: 'Find the minimum value',
    detail: 'Works with numbers, dates, and strings',
  },
  {
    label: 'GROUP_CONCAT',
    kind: 3,
    insertText: "GROUP_CONCAT(${1:column}, '${2:,}')",
    insertTextRules: 4,
    documentation: 'Concatenate values from multiple rows into a single string',
    detail: 'SQLite specific aggregate function',
  },

  // ===== STRING FUNCTIONS =====
  {
    label: 'CONCAT',
    kind: 3,
    insertText: 'CONCAT(${1:string1}, ${2:string2})',
    insertTextRules: 4,
    documentation: 'Concatenate two or more strings',
    detail: 'In SQLite, use || operator instead',
  },
  {
    label: 'String concatenation ||',
    kind: 15,
    insertText: "${1:column1} || ' ' || ${2:column2}",
    insertTextRules: 4,
    documentation: 'Concatenate strings using || operator (SQLite)',
    detail: 'Native SQLite concatenation',
  },
  {
    label: 'UPPER',
    kind: 3,
    insertText: 'UPPER(${1:column})',
    insertTextRules: 4,
    documentation: 'Convert string to uppercase',
    detail: 'Returns uppercase version',
  },
  {
    label: 'LOWER',
    kind: 3,
    insertText: 'LOWER(${1:column})',
    insertTextRules: 4,
    documentation: 'Convert string to lowercase',
    detail: 'Returns lowercase version',
  },
  {
    label: 'LENGTH',
    kind: 3,
    insertText: 'LENGTH(${1:column})',
    insertTextRules: 4,
    documentation: 'Get the length of a string',
    detail: 'Returns number of characters',
  },
  {
    label: 'SUBSTR',
    kind: 3,
    insertText: 'SUBSTR(${1:column}, ${2:start}, ${3:length})',
    insertTextRules: 4,
    documentation: 'Extract a substring from a string',
    detail: 'SUBSTR(string, start_pos, length)',
  },
  {
    label: 'TRIM',
    kind: 3,
    insertText: 'TRIM(${1:column})',
    insertTextRules: 4,
    documentation: 'Remove leading and trailing spaces',
    detail: 'Returns trimmed string',
  },
  {
    label: 'LTRIM',
    kind: 3,
    insertText: 'LTRIM(${1:column})',
    insertTextRules: 4,
    documentation: 'Remove leading spaces',
    detail: 'Trims left side only',
  },
  {
    label: 'RTRIM',
    kind: 3,
    insertText: 'RTRIM(${1:column})',
    insertTextRules: 4,
    documentation: 'Remove trailing spaces',
    detail: 'Trims right side only',
  },
  {
    label: 'REPLACE',
    kind: 3,
    insertText: "REPLACE(${1:column}, '${2:old}', '${3:new}')",
    insertTextRules: 4,
    documentation: 'Replace all occurrences of a substring',
    detail: 'REPLACE(string, find, replace)',
  },
  {
    label: 'INSTR',
    kind: 3,
    insertText: "INSTR(${1:column}, '${2:substring}')",
    insertTextRules: 4,
    documentation: 'Find the position of a substring',
    detail: 'Returns position or 0 if not found',
  },
  {
    label: 'PRINTF',
    kind: 3,
    insertText: "PRINTF('${1:%s}', ${2:column})",
    insertTextRules: 4,
    documentation: 'Format strings with printf-style formatting',
    detail: '%s=string, %d=integer, %f=float',
  },

  // ===== DATE/TIME FUNCTIONS =====
  {
    label: 'DATE',
    kind: 3,
    insertText: 'DATE(${1:column})',
    insertTextRules: 4,
    documentation: 'Extract the date part from a datetime',
    detail: 'Returns YYYY-MM-DD',
  },
  {
    label: 'TIME',
    kind: 3,
    insertText: 'TIME(${1:column})',
    insertTextRules: 4,
    documentation: 'Extract the time part from a datetime',
    detail: 'Returns HH:MM:SS',
  },
  {
    label: 'DATETIME',
    kind: 3,
    insertText: "DATETIME('${1:now}')",
    insertTextRules: 4,
    documentation: 'Get current datetime or parse datetime string',
    detail: "Use 'now' for current datetime",
  },
  {
    label: 'JULIANDAY',
    kind: 3,
    insertText: 'JULIANDAY(${1:column})',
    insertTextRules: 4,
    documentation: 'Convert datetime to Julian day number',
    detail: 'Useful for date calculations',
  },
  {
    label: 'STRFTIME',
    kind: 3,
    insertText: "STRFTIME('${1:%Y-%m-%d}', ${2:column})",
    insertTextRules: 4,
    documentation: 'Format date/time using format string',
    detail: '%Y=year, %m=month, %d=day, %H=hour, %M=minute, %S=second',
  },
  {
    label: 'DATE add days',
    kind: 15,
    insertText: "DATE(${1:column}, '+${2:1} day')",
    insertTextRules: 4,
    documentation: 'Add days to a date',
    detail: 'Can use day, month, year, hour, minute, second',
  },
  {
    label: 'DATE subtract days',
    kind: 15,
    insertText: "DATE(${1:column}, '-${2:1} day')",
    insertTextRules: 4,
    documentation: 'Subtract days from a date',
    detail: 'Use negative modifier for subtraction',
  },
  {
    label: 'CURRENT_TIMESTAMP',
    kind: 14,
    insertText: 'CURRENT_TIMESTAMP',
    documentation: 'Get current date and time',
    detail: 'Returns current UTC datetime',
  },
  {
    label: 'CURRENT_DATE',
    kind: 14,
    insertText: 'CURRENT_DATE',
    documentation: 'Get current date',
    detail: 'Returns current UTC date',
  },
  {
    label: 'CURRENT_TIME',
    kind: 14,
    insertText: 'CURRENT_TIME',
    documentation: 'Get current time',
    detail: 'Returns current UTC time',
  },

  // ===== NUMERIC FUNCTIONS =====
  {
    label: 'ABS',
    kind: 3,
    insertText: 'ABS(${1:column})',
    insertTextRules: 4,
    documentation: 'Get absolute value',
    detail: 'Returns positive value',
  },
  {
    label: 'ROUND',
    kind: 3,
    insertText: 'ROUND(${1:column}, ${2:decimals})',
    insertTextRules: 4,
    documentation: 'Round a number to specified decimal places',
    detail: 'ROUND(value, decimals)',
  },
  {
    label: 'CAST',
    kind: 3,
    insertText: 'CAST(${1:column} AS ${2|INTEGER,REAL,TEXT,BLOB|})',
    insertTextRules: 4,
    documentation: 'Convert value to a different data type',
    detail: 'Explicit type conversion',
  },
  {
    label: 'RANDOM',
    kind: 3,
    insertText: 'RANDOM()',
    insertTextRules: 4,
    documentation: 'Generate a random integer',
    detail: 'Returns random 64-bit signed integer',
  },
  {
    label: 'ABS RANDOM for range',
    kind: 15,
    insertText: 'ABS(RANDOM()) % ${1:100}',
    insertTextRules: 4,
    documentation: 'Generate random number in range 0 to N-1',
    detail: 'Use modulo for range',
  },

  // ===== CONDITIONAL EXPRESSIONS =====
  {
    label: 'CASE WHEN',
    kind: 15,
    insertText:
      'CASE\n  WHEN ${1:condition} THEN ${2:value}\n  WHEN ${3:condition} THEN ${4:value}\n  ELSE ${5:default}\nEND',
    insertTextRules: 4,
    documentation: 'Conditional expression with multiple conditions',
    detail: 'SQL equivalent of if-else',
  },
  {
    label: 'CASE simple',
    kind: 15,
    insertText:
      'CASE ${1:column}\n  WHEN ${2:value1} THEN ${3:result1}\n  WHEN ${4:value2} THEN ${5:result2}\n  ELSE ${6:default}\nEND',
    insertTextRules: 4,
    documentation: 'Simple CASE expression matching a column value',
    detail: 'Match against specific values',
  },
  {
    label: 'COALESCE',
    kind: 3,
    insertText: 'COALESCE(${1:column}, ${2:default_value})',
    insertTextRules: 4,
    documentation: 'Return first non-NULL value',
    detail: 'Useful for handling NULL values',
  },
  {
    label: 'IFNULL',
    kind: 3,
    insertText: 'IFNULL(${1:column}, ${2:default_value})',
    insertTextRules: 4,
    documentation: 'Replace NULL with default value',
    detail: 'SQLite equivalent of COALESCE for 2 arguments',
  },
  {
    label: 'NULLIF',
    kind: 3,
    insertText: 'NULLIF(${1:column}, ${2:value})',
    insertTextRules: 4,
    documentation: 'Return NULL if two values are equal',
    detail: 'Useful for avoiding division by zero',
  },

  // ===== WINDOW FUNCTIONS =====
  {
    label: 'ROW_NUMBER',
    kind: 15,
    insertText:
      'ROW_NUMBER() OVER (${1:PARTITION BY ${2:column}} ORDER BY ${3:column})',
    insertTextRules: 4,
    documentation: 'Assign unique sequential number to rows',
    detail: 'Useful for pagination and ranking',
  },
  {
    label: 'RANK',
    kind: 15,
    insertText: 'RANK() OVER (ORDER BY ${1:column} ${2|DESC,ASC|})',
    insertTextRules: 4,
    documentation: 'Assign rank with gaps for ties',
    detail: 'Ties get same rank, next rank is skipped',
  },
  {
    label: 'DENSE_RANK',
    kind: 15,
    insertText: 'DENSE_RANK() OVER (ORDER BY ${1:column} ${2|DESC,ASC|})',
    insertTextRules: 4,
    documentation: 'Assign rank without gaps for ties',
    detail: 'Ties get same rank, next rank continues',
  },
  {
    label: 'LAG',
    kind: 15,
    insertText: 'LAG(${1:column}, ${2:1}) OVER (ORDER BY ${3:column})',
    insertTextRules: 4,
    documentation: 'Access value from previous row',
    detail: 'Compare with previous row values',
  },
  {
    label: 'LEAD',
    kind: 15,
    insertText: 'LEAD(${1:column}, ${2:1}) OVER (ORDER BY ${3:column})',
    insertTextRules: 4,
    documentation: 'Access value from next row',
    detail: 'Compare with next row values',
  },
  {
    label: 'NTILE',
    kind: 15,
    insertText: 'NTILE(${1:4}) OVER (ORDER BY ${2:column})',
    insertTextRules: 4,
    documentation: 'Divide rows into N groups',
    detail: 'Useful for quartiles, percentiles',
  },
  {
    label: 'SUM OVER (running total)',
    kind: 15,
    insertText:
      'SUM(${1:column}) OVER (ORDER BY ${2:date} ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW)',
    insertTextRules: 4,
    documentation: 'Calculate running total',
    detail: 'Cumulative sum up to current row',
  },
  {
    label: 'AVG OVER (moving average)',
    kind: 15,
    insertText:
      'AVG(${1:column}) OVER (ORDER BY ${2:date} ROWS BETWEEN ${3:2} PRECEDING AND CURRENT ROW)',
    insertTextRules: 4,
    documentation: 'Calculate moving average',
    detail: 'Average over sliding window',
  },

  // ===== CLAUSES & KEYWORDS =====
  {
    label: 'WHERE',
    kind: 14,
    insertText: 'WHERE ${1:condition}',
    insertTextRules: 4,
    documentation: 'Filter rows based on a condition',
    detail: 'Applied before grouping',
  },
  {
    label: 'ORDER BY',
    kind: 14,
    insertText: 'ORDER BY ${1:column} ${2|ASC,DESC|}',
    insertTextRules: 4,
    documentation: 'Sort the result set',
    detail: 'ASC=ascending (default), DESC=descending',
  },
  {
    label: 'GROUP BY',
    kind: 14,
    insertText: 'GROUP BY ${1:column}',
    insertTextRules: 4,
    documentation: 'Group rows with the same values',
    detail: 'Used with aggregate functions',
  },
  {
    label: 'HAVING',
    kind: 14,
    insertText: 'HAVING ${1:condition}',
    insertTextRules: 4,
    documentation: 'Filter groups (use after GROUP BY)',
    detail: 'Applied after grouping',
  },
  {
    label: 'LIMIT',
    kind: 14,
    insertText: 'LIMIT ${1:10}',
    insertTextRules: 4,
    documentation: 'Limit the number of rows returned',
    detail: 'Pagination - max results',
  },
  {
    label: 'OFFSET',
    kind: 14,
    insertText: 'OFFSET ${1:0}',
    insertTextRules: 4,
    documentation: 'Skip a number of rows',
    detail: 'Pagination - skip rows',
  },
  {
    label: 'IN',
    kind: 14,
    insertText: "IN (${1:'value1', 'value2'})",
    insertTextRules: 4,
    documentation: 'Check if value exists in a list',
    detail: 'Match against multiple values',
  },
  {
    label: 'NOT IN',
    kind: 14,
    insertText: "NOT IN (${1:'value1', 'value2'})",
    insertTextRules: 4,
    documentation: 'Check if value does not exist in a list',
    detail: 'Exclude multiple values',
  },
  {
    label: 'BETWEEN',
    kind: 14,
    insertText: 'BETWEEN ${1:start} AND ${2:end}',
    insertTextRules: 4,
    documentation: 'Check if value is within a range (inclusive)',
    detail: 'Includes boundary values',
  },
  {
    label: 'NOT BETWEEN',
    kind: 14,
    insertText: 'NOT BETWEEN ${1:start} AND ${2:end}',
    insertTextRules: 4,
    documentation: 'Check if value is outside a range',
    detail: 'Excludes range',
  },
  {
    label: 'LIKE',
    kind: 14,
    insertText: "LIKE '${1:%pattern%}'",
    insertTextRules: 4,
    documentation: 'Pattern matching with wildcards',
    detail: '% = any characters, _ = single character',
  },
  {
    label: 'NOT LIKE',
    kind: 14,
    insertText: "NOT LIKE '${1:%pattern%}'",
    insertTextRules: 4,
    documentation: 'Negative pattern matching',
    detail: 'Does not match pattern',
  },
  {
    label: 'GLOB',
    kind: 14,
    insertText: "GLOB '${1:*pattern*}'",
    insertTextRules: 4,
    documentation: 'Pattern matching (case-sensitive)',
    detail: 'SQLite: * = any chars, ? = single char',
  },
  {
    label: 'IS NULL',
    kind: 14,
    insertText: 'IS NULL',
    documentation: 'Check if value is NULL',
    detail: 'Test for NULL values',
  },
  {
    label: 'IS NOT NULL',
    kind: 14,
    insertText: 'IS NOT NULL',
    documentation: 'Check if value is not NULL',
    detail: 'Test for non-NULL values',
  },
  {
    label: 'AND',
    kind: 14,
    insertText: 'AND ${1:condition}',
    insertTextRules: 4,
    documentation: 'Combine conditions (all must be true)',
    detail: 'Logical AND operator',
  },
  {
    label: 'OR',
    kind: 14,
    insertText: 'OR ${1:condition}',
    insertTextRules: 4,
    documentation: 'Combine conditions (at least one must be true)',
    detail: 'Logical OR operator',
  },
  {
    label: 'NOT',
    kind: 14,
    insertText: 'NOT ${1:condition}',
    insertTextRules: 4,
    documentation: 'Negate a condition',
    detail: 'Logical NOT operator',
  },

  // ===== JOIN KEYWORDS =====
  {
    label: 'INNER JOIN',
    kind: 14,
    insertText: 'INNER JOIN ${1:table} ON ${2:condition}',
    insertTextRules: 4,
    documentation: 'Return rows with matches in both tables',
    detail: 'Only matching rows',
  },
  {
    label: 'LEFT JOIN',
    kind: 14,
    insertText: 'LEFT JOIN ${1:table} ON ${2:condition}',
    insertTextRules: 4,
    documentation: 'Return all rows from left table',
    detail: 'All left rows + matching right rows',
  },
  {
    label: 'RIGHT JOIN',
    kind: 14,
    insertText: 'RIGHT JOIN ${1:table} ON ${2:condition}',
    insertTextRules: 4,
    documentation: 'Return all rows from right table',
    detail: 'All right rows + matching left rows',
  },
  {
    label: 'CROSS JOIN',
    kind: 14,
    insertText: 'CROSS JOIN ${1:table}',
    insertTextRules: 4,
    documentation: 'Cartesian product of two tables',
    detail: 'All possible row combinations',
  },

  // ===== DATA TYPES =====
  {
    label: 'INTEGER',
    kind: 25, // TypeParameter
    insertText: 'INTEGER',
    documentation: 'Integer data type (signed)',
    detail: 'Whole numbers',
  },
  {
    label: 'TEXT',
    kind: 25,
    insertText: 'TEXT',
    documentation: 'Text/string data type',
    detail: 'Variable length text',
  },
  {
    label: 'REAL',
    kind: 25,
    insertText: 'REAL',
    documentation: 'Floating point number',
    detail: 'Decimal numbers',
  },
  {
    label: 'BLOB',
    kind: 25,
    insertText: 'BLOB',
    documentation: 'Binary large object',
    detail: 'Binary data (images, files)',
  },
  {
    label: 'NUMERIC',
    kind: 25,
    insertText: 'NUMERIC',
    documentation: 'Numeric value (flexible type)',
    detail: 'Can store integer or real',
  },

  // ===== CONSTRAINTS =====
  {
    label: 'PRIMARY KEY',
    kind: 14,
    insertText: 'PRIMARY KEY',
    documentation: 'Uniquely identifies each row',
    detail: 'Unique + Not Null',
  },
  {
    label: 'PRIMARY KEY AUTOINCREMENT',
    kind: 14,
    insertText: 'PRIMARY KEY AUTOINCREMENT',
    documentation: 'Auto-incrementing primary key',
    detail: 'Automatically generates unique IDs',
  },
  {
    label: 'FOREIGN KEY',
    kind: 15,
    insertText: 'FOREIGN KEY (${1:column}) REFERENCES ${2:table}(${3:column})',
    insertTextRules: 4,
    documentation: 'Link to another table',
    detail: 'Enforces referential integrity',
  },
  {
    label: 'NOT NULL',
    kind: 14,
    insertText: 'NOT NULL',
    documentation: 'Column cannot contain NULL values',
    detail: 'Required field',
  },
  {
    label: 'UNIQUE',
    kind: 14,
    insertText: 'UNIQUE',
    documentation: 'All values must be unique',
    detail: 'No duplicate values allowed',
  },
  {
    label: 'DEFAULT',
    kind: 14,
    insertText: 'DEFAULT ${1:value}',
    insertTextRules: 4,
    documentation: 'Default value if none provided',
    detail: 'Fallback value',
  },
  {
    label: 'CHECK',
    kind: 14,
    insertText: 'CHECK(${1:condition})',
    insertTextRules: 4,
    documentation: 'Validate column values',
    detail: 'Custom validation rule',
  },
  {
    label: 'AUTOINCREMENT',
    kind: 14,
    insertText: 'AUTOINCREMENT',
    documentation: 'Auto-increment integer values',
    detail: 'Only with INTEGER PRIMARY KEY',
  },
  {
    label: 'ON DELETE CASCADE',
    kind: 14,
    insertText: 'ON DELETE CASCADE',
    documentation: 'Delete related rows when parent is deleted',
    detail: 'Automatic deletion of child records',
  },
  {
    label: 'ON UPDATE CASCADE',
    kind: 14,
    insertText: 'ON UPDATE CASCADE',
    documentation: 'Update related rows when parent is updated',
    detail: 'Automatic update of child records',
  },

  // ===== PRAGMA (SQLite specific) =====
  {
    label: 'PRAGMA table_info',
    kind: 15,
    insertText: 'PRAGMA table_info(${1:table_name})',
    insertTextRules: 4,
    documentation: 'Get information about table columns',
    detail: 'Show table schema',
  },
  {
    label: 'PRAGMA foreign_keys',
    kind: 15,
    insertText: 'PRAGMA foreign_keys = ${1|ON,OFF|}',
    insertTextRules: 4,
    documentation: 'Enable or disable foreign key constraints',
    detail: 'Foreign keys are OFF by default in SQLite',
  },
  {
    label: 'PRAGMA database_list',
    kind: 15,
    insertText: 'PRAGMA database_list',
    insertTextRules: 4,
    documentation: 'List all attached databases',
    detail: 'Show database connections',
  },
  {
    label: 'PRAGMA table_list',
    kind: 15,
    insertText: 'PRAGMA table_list',
    insertTextRules: 4,
    documentation: 'List all tables in the database',
    detail: 'Show all tables',
  },

  // ===== EXPLAIN =====
  {
    label: 'EXPLAIN',
    kind: 15,
    insertText: 'EXPLAIN ${1:SELECT * FROM table}',
    insertTextRules: 4,
    documentation: 'Show query execution plan',
    detail: 'Analyze query performance',
  },
  {
    label: 'EXPLAIN QUERY PLAN',
    kind: 15,
    insertText: 'EXPLAIN QUERY PLAN\n${1:SELECT * FROM table}',
    insertTextRules: 4,
    documentation: 'Show high-level query execution plan',
    detail: 'Understand how query is executed',
  },

  // ===== ADVANCED SELECT PATTERNS =====
  {
    label: 'SELECT TOP N per group',
    kind: 15,
    insertText:
      'SELECT *\nFROM (\n  SELECT *,\n    ROW_NUMBER() OVER (PARTITION BY ${1:group_column} ORDER BY ${2:order_column} DESC) as rn\n  FROM ${3:table}\n) ranked\nWHERE rn <= ${4:3}',
    insertTextRules: 4,
    documentation: 'Get top N rows per group using window functions',
    detail: 'Useful for getting best/worst items per category',
  },
  {
    label: 'SELECT with PIVOT (manual)',
    kind: 15,
    insertText:
      "SELECT\n  ${1:id},\n  SUM(CASE WHEN ${2:category} = '${3:A}' THEN ${4:value} ELSE 0 END) as ${3:A},\n  SUM(CASE WHEN ${2:category} = '${5:B}' THEN ${4:value} ELSE 0 END) as ${5:B},\n  SUM(CASE WHEN ${2:category} = '${6:C}' THEN ${4:value} ELSE 0 END) as ${6:C}\nFROM ${7:table}\nGROUP BY ${1:id}",
    insertTextRules: 4,
    documentation: 'Pivot rows into columns using CASE expressions',
    detail: 'Transform row data into columnar format',
  },
  {
    label: 'SELECT with UNPIVOT (manual)',
    kind: 15,
    insertText:
      "SELECT ${1:id}, '${2:col1}' as category, ${2:col1} as value FROM ${3:table}\nUNION ALL\nSELECT ${1:id}, '${4:col2}' as category, ${4:col2} as value FROM ${3:table}\nUNION ALL\nSELECT ${1:id}, '${5:col3}' as category, ${5:col3} as value FROM ${3:table}",
    insertTextRules: 4,
    documentation: 'Unpivot columns into rows using UNION ALL',
    detail: 'Transform columnar data into row format',
  },
  {
    label: 'SELECT running difference',
    kind: 15,
    insertText:
      'SELECT\n  ${1:date},\n  ${2:value},\n  ${2:value} - LAG(${2:value}) OVER (ORDER BY ${1:date}) as difference\nFROM ${3:table}\nORDER BY ${1:date}',
    insertTextRules: 4,
    documentation: 'Calculate difference from previous row',
    detail: 'Useful for trend analysis and change tracking',
  },
  {
    label: 'SELECT percentage of total',
    kind: 15,
    insertText:
      'SELECT\n  ${1:category},\n  ${2:value},\n  ROUND(${2:value} * 100.0 / SUM(${2:value}) OVER (), 2) as percentage\nFROM ${3:table}',
    insertTextRules: 4,
    documentation: 'Calculate percentage of each row relative to total',
    detail: 'Useful for distribution analysis',
  },
  {
    label: 'SELECT with CROSS APPLY (correlated subquery)',
    kind: 15,
    insertText:
      'SELECT a.*, b.*\nFROM ${1:table_a} a,\n  (\n    SELECT ${2:*}\n    FROM ${3:table_b}\n    WHERE ${4:condition}\n      AND ${3:table_b}.${5:id} = a.${6:id}\n    LIMIT ${7:1}\n  ) b',
    insertTextRules: 4,
    documentation: 'Correlated subquery that runs for each row in outer query',
    detail: 'SQLite equivalent of CROSS APPLY',
  },
  {
    label: 'SELECT cumulative sum with reset',
    kind: 15,
    insertText:
      'SELECT\n  ${1:group_col},\n  ${2:order_col},\n  ${3:value},\n  SUM(${3:value}) OVER (\n    PARTITION BY ${1:group_col}\n    ORDER BY ${2:order_col}\n    ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW\n  ) as cumulative_sum\nFROM ${4:table}',
    insertTextRules: 4,
    documentation: 'Cumulative sum that resets for each group',
    detail: 'Running total within each partition',
  },
  {
    label: 'SELECT with QUALIFY (filter window results)',
    kind: 15,
    insertText:
      'SELECT *\nFROM (\n  SELECT *,\n    ROW_NUMBER() OVER (PARTITION BY ${1:group_col} ORDER BY ${2:order_col}) as rn\n  FROM ${3:table}\n)\nWHERE rn = 1',
    insertTextRules: 4,
    documentation: 'Filter rows based on window function results',
    detail: 'SQLite equivalent of QUALIFY clause',
  },
  {
    label: 'SELECT gaps and islands',
    kind: 15,
    insertText:
      'WITH numbered AS (\n  SELECT\n    ${1:id},\n    ${2:date},\n    ROW_NUMBER() OVER (ORDER BY ${2:date}) as rn,\n    JULIANDAY(${2:date}) - ROW_NUMBER() OVER (ORDER BY ${2:date}) as grp\n  FROM ${3:table}\n)\nSELECT\n  MIN(${2:date}) as start_date,\n  MAX(${2:date}) as end_date,\n  COUNT(*) as consecutive_days\nFROM numbered\nGROUP BY grp\nORDER BY start_date',
    insertTextRules: 4,
    documentation: 'Find consecutive sequences and gaps in data',
    detail: 'Useful for attendance, streak tracking, etc.',
  },
  {
    label: 'SELECT median value',
    kind: 15,
    insertText:
      'SELECT AVG(${1:column})\nFROM (\n  SELECT ${1:column}\n  FROM ${2:table}\n  ORDER BY ${1:column}\n  LIMIT 2 - (SELECT COUNT(*) FROM ${2:table}) % 2\n  OFFSET (SELECT (COUNT(*) - 1) / 2 FROM ${2:table})\n)',
    insertTextRules: 4,
    documentation: 'Calculate median value (50th percentile)',
    detail: 'SQLite does not have built-in MEDIAN function',
  },
  {
    label: 'SELECT mode (most frequent value)',
    kind: 15,
    insertText:
      'SELECT ${1:column}\nFROM ${2:table}\nGROUP BY ${1:column}\nORDER BY COUNT(*) DESC\nLIMIT 1',
    insertTextRules: 4,
    documentation: 'Find the most frequently occurring value',
    detail: 'Returns the statistical mode',
  },
  {
    label: 'SELECT duplicate rows',
    kind: 15,
    insertText:
      'SELECT ${1:column1}, ${2:column2}, COUNT(*) as duplicate_count\nFROM ${3:table}\nGROUP BY ${1:column1}, ${2:column2}\nHAVING COUNT(*) > 1',
    insertTextRules: 4,
    documentation: 'Find duplicate rows based on specified columns',
    detail: 'Useful for data quality checks',
  },
  {
    label: 'SELECT rows with all values',
    kind: 15,
    insertText:
      "SELECT ${1:id}\nFROM ${2:table}\nWHERE ${3:category} IN (${4:'A', 'B', 'C'})\nGROUP BY ${1:id}\nHAVING COUNT(DISTINCT ${3:category}) = ${5:3}",
    insertTextRules: 4,
    documentation: 'Find IDs that have all specified category values',
    detail: 'Relational division pattern',
  },
  {
    label: 'SELECT date range series',
    kind: 15,
    insertText:
      "WITH RECURSIVE dates(date) AS (\n  SELECT DATE('${1:2024-01-01}')\n  UNION ALL\n  SELECT DATE(date, '+1 day')\n  FROM dates\n  WHERE date < DATE('${2:2024-12-31}')\n)\nSELECT date FROM dates",
    insertTextRules: 4,
    documentation: 'Generate a series of dates between two dates',
    detail: 'Useful for filling gaps in time series data',
  },
  {
    label: 'SELECT number series',
    kind: 15,
    insertText:
      'WITH RECURSIVE numbers(n) AS (\n  SELECT ${1:1}\n  UNION ALL\n  SELECT n + 1\n  FROM numbers\n  WHERE n < ${2:100}\n)\nSELECT n FROM numbers',
    insertTextRules: 4,
    documentation: 'Generate a series of numbers',
    detail: 'Useful for generating test data or filling sequences',
  },
  {
    label: 'SELECT hierarchical path',
    kind: 15,
    insertText:
      "WITH RECURSIVE hierarchy(id, name, parent_id, path, level) AS (\n  SELECT id, name, parent_id, name as path, 0 as level\n  FROM ${1:table}\n  WHERE parent_id IS NULL\n  \n  UNION ALL\n  \n  SELECT t.id, t.name, t.parent_id, h.path || ' > ' || t.name, h.level + 1\n  FROM ${1:table} t\n  JOIN hierarchy h ON t.parent_id = h.id\n)\nSELECT * FROM hierarchy",
    insertTextRules: 4,
    documentation: 'Build full path for hierarchical data',
    detail: 'Shows complete ancestry chain',
  },
  {
    label: 'SELECT with FETCH FIRST (alternative to LIMIT)',
    kind: 15,
    insertText:
      'SELECT ${1:*}\nFROM ${2:table}\nORDER BY ${3:column}\nFETCH FIRST ${4:10} ROWS ONLY',
    insertTextRules: 4,
    documentation: 'Limit results using SQL standard FETCH FIRST syntax',
    detail: 'More portable than LIMIT',
  },
  {
    label: 'SELECT with LATERAL join (correlated)',
    kind: 15,
    insertText:
      'SELECT a.${1:*}, sub.*\nFROM ${2:table_a} a,\nLATERAL (\n  SELECT ${3:*}\n  FROM ${4:table_b} b\n  WHERE b.${5:id} = a.${6:id}\n  LIMIT ${7:5}\n) sub',
    insertTextRules: 4,
    documentation: 'Correlated subquery in FROM clause',
    detail: 'SQLite 3.39+ supports LATERAL',
  },

  // ===== DATA MANIPULATION PATTERNS =====
  {
    label: 'UPSERT (INSERT or UPDATE)',
    kind: 15,
    insertText:
      'INSERT INTO ${1:table} (${2:id}, ${3:column})\nVALUES (${4:value1}, ${5:value2})\nON CONFLICT(${2:id})\nDO UPDATE SET ${3:column} = ${5:value2}',
    insertTextRules: 4,
    documentation: 'Insert new row or update if already exists',
    detail: 'SQLite 3.24+ UPSERT syntax',
  },
  {
    label: 'INSERT multiple rows with DEFAULT VALUES',
    kind: 15,
    insertText:
      'INSERT INTO ${1:table} (${2:column1}, ${3:column2})\nVALUES\n  (${4:value1}, DEFAULT),\n  (${5:value2}, DEFAULT),\n  (${6:value3}, DEFAULT)',
    insertTextRules: 4,
    documentation: 'Insert multiple rows using DEFAULT for some columns',
    detail: 'Mix explicit values with defaults',
  },
  {
    label: 'INSERT with RETURNING',
    kind: 15,
    insertText:
      'INSERT INTO ${1:table} (${2:columns})\nVALUES (${3:values})\nRETURNING *',
    insertTextRules: 4,
    documentation: 'Insert and return the inserted rows',
    detail: 'SQLite 3.35+ supports RETURNING',
  },
  {
    label: 'UPDATE with RETURNING',
    kind: 15,
    insertText:
      'UPDATE ${1:table}\nSET ${2:column} = ${3:value}\nWHERE ${4:condition}\nRETURNING *',
    insertTextRules: 4,
    documentation: 'Update and return the modified rows',
    detail: 'See what changed',
  },
  {
    label: 'DELETE with RETURNING',
    kind: 15,
    insertText: 'DELETE FROM ${1:table}\nWHERE ${2:condition}\nRETURNING *',
    insertTextRules: 4,
    documentation: 'Delete and return the deleted rows',
    detail: 'Archive deleted data',
  },
  {
    label: 'UPDATE from CTE',
    kind: 15,
    insertText:
      'WITH updates AS (\n  SELECT ${1:id}, ${2:new_value}\n  FROM ${3:source_table}\n  WHERE ${4:condition}\n)\nUPDATE ${5:target_table}\nSET ${6:column} = (\n  SELECT ${2:new_value}\n  FROM updates\n  WHERE updates.${1:id} = ${5:target_table}.${7:id}\n)\nWHERE ${7:id} IN (SELECT ${1:id} FROM updates)',
    insertTextRules: 4,
    documentation: 'Update using values from a CTE',
    detail: 'Complex update with intermediate calculation',
  },
  {
    label: 'DELETE duplicate rows (keep first)',
    kind: 15,
    insertText:
      'DELETE FROM ${1:table}\nWHERE rowid NOT IN (\n  SELECT MIN(rowid)\n  FROM ${1:table}\n  GROUP BY ${2:column1}, ${3:column2}\n)',
    insertTextRules: 4,
    documentation: 'Remove duplicate rows, keeping the first occurrence',
    detail: 'Uses SQLite rowid for identification',
  },
  {
    label: 'INSERT with column value from sequence',
    kind: 15,
    insertText:
      "INSERT INTO ${1:table} (${2:id}, ${3:name})\nSELECT n, 'Item ' || n\nFROM (\n  WITH RECURSIVE numbers(n) AS (\n    SELECT 1\n    UNION ALL\n    SELECT n + 1 FROM numbers WHERE n < ${4:100}\n  )\n  SELECT n FROM numbers\n)",
    insertTextRules: 4,
    documentation: 'Generate and insert sequential data',
    detail: 'Bulk insert with generated values',
  },
  {
    label: 'UPDATE conditional on multiple tables',
    kind: 15,
    insertText:
      "UPDATE ${1:table_a}\nSET ${2:status} = '${3:updated}'\nWHERE EXISTS (\n  SELECT 1\n  FROM ${4:table_b}\n  WHERE ${4:table_b}.${5:id} = ${1:table_a}.${6:id}\n    AND ${4:table_b}.${7:condition}\n)",
    insertTextRules: 4,
    documentation: 'Update rows based on related table data',
    detail: 'Conditional update with EXISTS',
  },

  // ===== TABLE DESIGN PATTERNS =====
  {
    label: 'CREATE TABLE with audit columns',
    kind: 15,
    insertText:
      'CREATE TABLE ${1:table_name} (\n  ${2:id} INTEGER PRIMARY KEY AUTOINCREMENT,\n  ${3:name} TEXT NOT NULL,\n  ${4:value} REAL,\n  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,\n  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,\n  created_by TEXT,\n  updated_by TEXT,\n  is_deleted INTEGER DEFAULT 0\n)',
    insertTextRules: 4,
    documentation: 'Create table with audit trail columns',
    detail: 'Track who created/modified and when',
  },
  {
    label: 'CREATE TABLE with JSON column',
    kind: 15,
    insertText:
      'CREATE TABLE ${1:table_name} (\n  ${2:id} INTEGER PRIMARY KEY AUTOINCREMENT,\n  ${3:name} TEXT NOT NULL,\n  ${4:metadata} TEXT CHECK(json_valid(${4:metadata})),\n  created_at DATETIME DEFAULT CURRENT_TIMESTAMP\n)',
    insertTextRules: 4,
    documentation: 'Create table with JSON validation',
    detail: 'SQLite 3.38+ JSON functions',
  },
  {
    label: 'CREATE TABLE with composite primary key',
    kind: 15,
    insertText:
      'CREATE TABLE ${1:table_name} (\n  ${2:column1} ${3:INTEGER} NOT NULL,\n  ${4:column2} ${5:TEXT} NOT NULL,\n  ${6:column3} ${7:TEXT},\n  PRIMARY KEY (${2:column1}, ${4:column2})\n)',
    insertTextRules: 4,
    documentation: 'Create table with multi-column primary key',
    detail: 'Useful for junction tables',
  },
  {
    label: 'CREATE TABLE with generated column',
    kind: 15,
    insertText:
      "CREATE TABLE ${1:table_name} (\n  ${2:id} INTEGER PRIMARY KEY AUTOINCREMENT,\n  ${3:first_name} TEXT,\n  ${4:last_name} TEXT,\n  ${5:full_name} TEXT GENERATED ALWAYS AS (${3:first_name} || ' ' || ${4:last_name}) STORED\n)",
    insertTextRules: 4,
    documentation: 'Create table with computed/generated column',
    detail: 'SQLite 3.31+ generated columns',
  },
  {
    label: 'CREATE TABLE with STRICT typing',
    kind: 15,
    insertText:
      'CREATE TABLE ${1:table_name} (\n  ${2:id} INTEGER PRIMARY KEY,\n  ${3:name} TEXT NOT NULL,\n  ${4:age} INTEGER,\n  ${5:price} REAL\n) STRICT',
    insertTextRules: 4,
    documentation: 'Create table with strict type enforcement',
    detail: 'SQLite 3.37+ STRICT tables',
  },
  {
    label: 'CREATE TABLE for many-to-many relationship',
    kind: 15,
    insertText:
      'CREATE TABLE ${1:junction_table} (\n  ${2:table_a}_id INTEGER NOT NULL,\n  ${3:table_b}_id INTEGER NOT NULL,\n  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,\n  PRIMARY KEY (${2:table_a}_id, ${3:table_b}_id),\n  FOREIGN KEY (${2:table_a}_id) REFERENCES ${2:table_a}(id) ON DELETE CASCADE,\n  FOREIGN KEY (${3:table_b}_id) REFERENCES ${3:table_b}(id) ON DELETE CASCADE\n)',
    insertTextRules: 4,
    documentation: 'Create junction table for many-to-many relationships',
    detail: 'Includes foreign key constraints',
  },
  {
    label: 'CREATE TABLE with enum-like constraint',
    kind: 15,
    insertText:
      "CREATE TABLE ${1:table_name} (\n  ${2:id} INTEGER PRIMARY KEY AUTOINCREMENT,\n  ${3:status} TEXT CHECK(${3:status} IN ('${4:pending}', '${5:active}', '${6:completed}', '${7:cancelled}')) NOT NULL DEFAULT '${4:pending}'\n)",
    insertTextRules: 4,
    documentation: 'Create table with enum-like check constraint',
    detail: 'Restrict column to specific values',
  },
  {
    label: 'CREATE TABLE with versioning',
    kind: 15,
    insertText:
      'CREATE TABLE ${1:table_name} (\n  ${2:id} INTEGER PRIMARY KEY AUTOINCREMENT,\n  ${3:entity_id} INTEGER NOT NULL,\n  ${4:version} INTEGER NOT NULL DEFAULT 1,\n  ${5:data} TEXT,\n  valid_from DATETIME DEFAULT CURRENT_TIMESTAMP,\n  valid_to DATETIME,\n  is_current INTEGER DEFAULT 1,\n  UNIQUE(${3:entity_id}, ${4:version})\n)',
    insertTextRules: 4,
    documentation: 'Create table for temporal/versioned data',
    detail: 'Track history and changes over time',
  },

  // ===== JSON OPERATIONS (SQLite 3.38+) =====
  {
    label: 'SELECT JSON field',
    kind: 15,
    insertText:
      "SELECT json_extract(${1:json_column}, '$.${2:field}')\nFROM ${3:table}",
    insertTextRules: 4,
    documentation: 'Extract a field from JSON column',
    detail: 'Access nested JSON data',
  },
  {
    label: 'SELECT multiple JSON fields',
    kind: 15,
    insertText:
      "SELECT\n  json_extract(${1:json_column}, '$.${2:field1}') as ${2:field1},\n  json_extract(${1:json_column}, '$.${3:field2}') as ${3:field2},\n  json_extract(${1:json_column}, '$.${4:field3}') as ${4:field3}\nFROM ${5:table}",
    insertTextRules: 4,
    documentation: 'Extract multiple fields from JSON',
    detail: 'Parse JSON into columns',
  },
  {
    label: 'SELECT JSON array element',
    kind: 15,
    insertText:
      "SELECT json_extract(${1:json_column}, '$.${2:array}[${3:0}]')\nFROM ${4:table}",
    insertTextRules: 4,
    documentation: 'Extract element from JSON array by index',
    detail: 'Access array items',
  },
  {
    label: 'SELECT with JSON_EACH',
    kind: 15,
    insertText:
      "SELECT t.${1:id}, j.value\nFROM ${2:table} t,\n  json_each(t.${3:json_column}) j\nWHERE j.key = '${4:property}'",
    insertTextRules: 4,
    documentation: 'Expand JSON array/object into rows',
    detail: 'Convert JSON to relational format',
  },
  {
    label: 'UPDATE JSON field',
    kind: 15,
    insertText:
      "UPDATE ${1:table}\nSET ${2:json_column} = json_set(${2:json_column}, '$.${3:field}', ${4:value})\nWHERE ${5:condition}",
    insertTextRules: 4,
    documentation: 'Update a specific field in JSON column',
    detail: 'Modify JSON without parsing entire object',
  },
  {
    label: 'INSERT JSON object',
    kind: 15,
    insertText:
      "INSERT INTO ${1:table} (${2:json_column})\nVALUES (json_object(\n  '${3:key1}', ${4:value1},\n  '${5:key2}', ${6:value2},\n  '${7:key3}', ${8:value3}\n))",
    insertTextRules: 4,
    documentation: 'Create and insert JSON object',
    detail: 'Build JSON from values',
  },
  {
    label: 'WHERE JSON contains value',
    kind: 15,
    insertText:
      "SELECT *\nFROM ${1:table}\nWHERE json_extract(${2:json_column}, '$.${3:field}') = ${4:value}",
    insertTextRules: 4,
    documentation: 'Filter rows by JSON field value',
    detail: 'Query JSON content',
  },
  {
    label: 'CREATE INDEX on JSON field',
    kind: 15,
    insertText:
      "CREATE INDEX ${1:idx_name}\nON ${2:table}(json_extract(${3:json_column}, '$.${4:field}'))",
    insertTextRules: 4,
    documentation: 'Create index on extracted JSON field',
    detail: 'Improve JSON query performance',
  },

  // ===== FULL-TEXT SEARCH (FTS5) =====
  {
    label: 'CREATE FTS5 virtual table',
    kind: 15,
    insertText:
      "CREATE VIRTUAL TABLE ${1:fts_table} USING fts5(\n  ${2:title},\n  ${3:content},\n  ${4:author},\n  tokenize = '${5:porter ascii}'\n)",
    insertTextRules: 4,
    documentation: 'Create full-text search table (FTS5)',
    detail: 'Fast text search capabilities',
  },
  {
    label: 'FTS5 search query',
    kind: 15,
    insertText:
      "SELECT *\nFROM ${1:fts_table}\nWHERE ${1:fts_table} MATCH '${2:search term}'\nORDER BY rank",
    insertTextRules: 4,
    documentation: 'Search FTS5 table for matching text',
    detail: 'Full-text search with ranking',
  },
  {
    label: 'FTS5 phrase search',
    kind: 15,
    insertText:
      'SELECT *\nFROM ${1:fts_table}\nWHERE ${1:fts_table} MATCH \'"${2:exact phrase}"\'',
    insertTextRules: 4,
    documentation: 'Search for exact phrase in FTS5 table',
    detail: 'Use quotes for phrase matching',
  },
  {
    label: 'FTS5 boolean search',
    kind: 15,
    insertText:
      "SELECT *\nFROM ${1:fts_table}\nWHERE ${1:fts_table} MATCH '${2:term1} AND ${3:term2} OR ${4:term3} NOT ${5:term4}'",
    insertTextRules: 4,
    documentation: 'Boolean search with AND, OR, NOT operators',
    detail: 'Complex search queries',
  },
  {
    label: 'FTS5 column search',
    kind: 15,
    insertText:
      "SELECT *\nFROM ${1:fts_table}\nWHERE ${2:column} MATCH '${3:search term}'",
    insertTextRules: 4,
    documentation: 'Search in specific FTS5 column',
    detail: 'Limit search to one column',
  },
  {
    label: 'FTS5 highlight results',
    kind: 15,
    insertText:
      "SELECT highlight(${1:fts_table}, ${2:0}, '${3:<b>}', '${4:</b>}') as highlighted\nFROM ${1:fts_table}\nWHERE ${1:fts_table} MATCH '${5:search term}'",
    insertTextRules: 4,
    documentation: 'Highlight matching text in FTS5 results',
    detail: 'Wrap matches with custom tags',
  },
  {
    label: 'FTS5 snippet extraction',
    kind: 15,
    insertText:
      "SELECT snippet(${1:fts_table}, ${2:0}, '${3:<b>}', '${4:</b>}', '${5:...}', ${6:20}) as snippet\nFROM ${1:fts_table}\nWHERE ${1:fts_table} MATCH '${7:search term}'",
    insertTextRules: 4,
    documentation: 'Extract text snippet around matches',
    detail: 'Context around search results',
  },

  // ===== PERFORMANCE & OPTIMIZATION =====
  {
    label: 'ANALYZE table',
    kind: 15,
    insertText: 'ANALYZE ${1:table_name}',
    insertTextRules: 4,
    documentation: 'Gather statistics to optimize query planning',
    detail: 'Run after significant data changes',
  },
  {
    label: 'VACUUM database',
    kind: 15,
    insertText: 'VACUUM',
    insertTextRules: 4,
    documentation: 'Rebuild database file, reclaiming unused space',
    detail: 'Defragments and optimizes database',
  },
  {
    label: 'PRAGMA optimize',
    kind: 15,
    insertText: 'PRAGMA optimize',
    insertTextRules: 4,
    documentation: 'Perform optimization analysis',
    detail: 'Run before closing database',
  },
  {
    label: 'PRAGMA cache_size',
    kind: 15,
    insertText: 'PRAGMA cache_size = ${1:10000}',
    insertTextRules: 4,
    documentation: 'Set page cache size for better performance',
    detail: 'Increase for better read performance',
  },
  {
    label: 'PRAGMA journal_mode WAL',
    kind: 15,
    insertText: 'PRAGMA journal_mode = WAL',
    insertTextRules: 4,
    documentation: 'Enable Write-Ahead Logging for better concurrency',
    detail: 'Recommended for most applications',
  },
  {
    label: 'PRAGMA synchronous',
    kind: 15,
    insertText: 'PRAGMA synchronous = ${1|OFF,NORMAL,FULL,EXTRA|}',
    insertTextRules: 4,
    documentation: 'Control sync operations (tradeoff: speed vs safety)',
    detail: 'NORMAL is good balance',
  },
  {
    label: 'PRAGMA temp_store MEMORY',
    kind: 15,
    insertText: 'PRAGMA temp_store = MEMORY',
    insertTextRules: 4,
    documentation: 'Store temporary tables in memory',
    detail: 'Faster temporary operations',
  },
  {
    label: 'PRAGMA mmap_size',
    kind: 15,
    insertText: 'PRAGMA mmap_size = ${1:268435456}',
    insertTextRules: 4,
    documentation: 'Enable memory-mapped I/O for performance',
    detail: 'Can significantly speed up reads',
  },
  {
    label: 'CREATE INDEX with WHERE clause',
    kind: 15,
    insertText:
      'CREATE INDEX ${1:idx_name}\nON ${2:table}(${3:column})\nWHERE ${4:condition}',
    insertTextRules: 4,
    documentation: 'Partial index for subset of rows',
    detail: 'Smaller, more efficient index',
  },
  {
    label: 'CREATE INDEX with expressions',
    kind: 15,
    insertText: 'CREATE INDEX ${1:idx_name}\nON ${2:table}(LOWER(${3:column}))',
    insertTextRules: 4,
    documentation: 'Index on expression result',
    detail: 'Case-insensitive search optimization',
  },

  // ===== UTILITY & SYSTEM QUERIES =====
  {
    label: 'List all tables',
    kind: 15,
    insertText:
      "SELECT name\nFROM sqlite_master\nWHERE type = 'table'\nORDER BY name",
    insertTextRules: 4,
    documentation: 'Get list of all tables in database',
    detail: 'Query system catalog',
  },
  {
    label: 'List all indexes',
    kind: 15,
    insertText:
      "SELECT name, tbl_name\nFROM sqlite_master\nWHERE type = 'index'\nORDER BY name",
    insertTextRules: 4,
    documentation: 'Get list of all indexes',
    detail: 'View index information',
  },
  {
    label: 'List all views',
    kind: 15,
    insertText:
      "SELECT name, sql\nFROM sqlite_master\nWHERE type = 'view'\nORDER BY name",
    insertTextRules: 4,
    documentation: 'Get list of all views with definitions',
    detail: 'See view SQL',
  },
  {
    label: 'List all triggers',
    kind: 15,
    insertText:
      "SELECT name, tbl_name, sql\nFROM sqlite_master\nWHERE type = 'trigger'\nORDER BY name",
    insertTextRules: 4,
    documentation: 'Get list of all triggers',
    detail: 'View trigger definitions',
  },
  {
    label: 'Show table schema',
    kind: 15,
    insertText:
      "SELECT sql\nFROM sqlite_master\nWHERE type = 'table'\n  AND name = '${1:table_name}'",
    insertTextRules: 4,
    documentation: 'Get CREATE TABLE statement for a table',
    detail: 'View table definition',
  },
  {
    label: 'Count all rows in table',
    kind: 15,
    insertText: 'SELECT COUNT(*) as total_rows\nFROM ${1:table}',
    insertTextRules: 4,
    documentation: 'Get total row count',
    detail: 'Simple count query',
  },
  {
    label: 'Get table size statistics',
    kind: 15,
    insertText:
      "SELECT\n  name as table_name,\n  SUM(pgsize) as total_bytes,\n  SUM(pgsize) / 1024.0 as total_kb,\n  SUM(pgsize) / (1024.0 * 1024.0) as total_mb\nFROM dbstat\nWHERE name = '${1:table_name}'\nGROUP BY name",
    insertTextRules: 4,
    documentation: 'Get storage size for a table',
    detail: 'Requires dbstat virtual table',
  },
  {
    label: 'Check foreign key violations',
    kind: 15,
    insertText: 'PRAGMA foreign_key_check(${1:table_name})',
    insertTextRules: 4,
    documentation: 'Check for foreign key constraint violations',
    detail: 'Data integrity verification',
  },
  {
    label: 'Check database integrity',
    kind: 15,
    insertText: 'PRAGMA integrity_check',
    insertTextRules: 4,
    documentation: 'Verify database is not corrupted',
    detail: 'Returns "ok" if database is valid',
  },
  {
    label: 'PRAGMA quick_check',
    kind: 15,
    insertText: 'PRAGMA quick_check',
    insertTextRules: 4,
    documentation: 'Fast integrity check (skips some checks)',
    detail: 'Quicker than full integrity_check',
  },
  {
    label: 'Get database page size',
    kind: 15,
    insertText: 'PRAGMA page_size',
    insertTextRules: 4,
    documentation: 'Get database page size in bytes',
    detail: 'Usually 4096 bytes',
  },
  {
    label: 'Get database encoding',
    kind: 15,
    insertText: 'PRAGMA encoding',
    insertTextRules: 4,
    documentation: 'Get database text encoding',
    detail: 'UTF-8, UTF-16le, or UTF-16be',
  },
  {
    label: 'Get SQLite version',
    kind: 15,
    insertText: 'SELECT sqlite_version()',
    insertTextRules: 4,
    documentation: 'Get SQLite version number',
    detail: 'Check which version is running',
  },
  {
    label: 'Get database file size',
    kind: 15,
    insertText: 'PRAGMA page_count',
    insertTextRules: 4,
    documentation: 'Get number of pages in database',
    detail: 'Multiply by page_size for total bytes',
  },

  // ===== COMMON BUSINESS PATTERNS =====
  {
    label: 'Calculate running balance',
    kind: 15,
    insertText:
      'SELECT\n  ${1:date},\n  ${2:transaction_type},\n  ${3:amount},\n  SUM(${3:amount}) OVER (\n    ORDER BY ${1:date}\n    ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW\n  ) as balance\nFROM ${4:transactions}\nORDER BY ${1:date}',
    insertTextRules: 4,
    documentation: 'Calculate cumulative balance over time',
    detail: 'Banking/accounting pattern',
  },
  {
    label: 'Pivot sales by month',
    kind: 15,
    insertText:
      'SELECT\n  ${1:product},\n  SUM(CASE WHEN ${2:month} = 1 THEN ${3:sales} ELSE 0 END) as Jan,\n  SUM(CASE WHEN ${2:month} = 2 THEN ${3:sales} ELSE 0 END) as Feb,\n  SUM(CASE WHEN ${2:month} = 3 THEN ${3:sales} ELSE 0 END) as Mar,\n  SUM(CASE WHEN ${2:month} = 4 THEN ${3:sales} ELSE 0 END) as Apr,\n  SUM(${3:sales}) as Total\nFROM ${4:sales_table}\nGROUP BY ${1:product}',
    insertTextRules: 4,
    documentation: 'Create month-wise sales report',
    detail: 'Pivot pattern for reporting',
  },
  {
    label: 'Year-over-year comparison',
    kind: 15,
    insertText:
      "SELECT\n  ${1:category},\n  SUM(CASE WHEN STRFTIME('%Y', ${2:date}) = '${3:2023}' THEN ${4:amount} ELSE 0 END) as year_2023,\n  SUM(CASE WHEN STRFTIME('%Y', ${2:date}) = '${5:2024}' THEN ${4:amount} ELSE 0 END) as year_2024,\n  ROUND(\n    (SUM(CASE WHEN STRFTIME('%Y', ${2:date}) = '${5:2024}' THEN ${4:amount} ELSE 0 END) -\n     SUM(CASE WHEN STRFTIME('%Y', ${2:date}) = '${3:2023}' THEN ${4:amount} ELSE 0 END)) * 100.0 /\n    NULLIF(SUM(CASE WHEN STRFTIME('%Y', ${2:date}) = '${3:2023}' THEN ${4:amount} ELSE 0 END), 0),\n    2\n  ) as pct_change\nFROM ${6:table}\nGROUP BY ${1:category}",
    insertTextRules: 4,
    documentation: 'Compare metrics year-over-year with percent change',
    detail: 'Business analytics pattern',
  },
  {
    label: 'Customer RFM analysis',
    kind: 15,
    insertText:
      "SELECT\n  ${1:customer_id},\n  JULIANDAY('now') - JULIANDAY(MAX(${2:order_date})) as recency_days,\n  COUNT(*) as frequency,\n  SUM(${3:order_total}) as monetary\nFROM ${4:orders}\nGROUP BY ${1:customer_id}\nORDER BY monetary DESC",
    insertTextRules: 4,
    documentation: 'Recency, Frequency, Monetary analysis for customers',
    detail: 'Customer segmentation pattern',
  },
  {
    label: 'Calculate retention rate',
    kind: 15,
    insertText:
      "WITH first_purchase AS (\n  SELECT\n    ${1:customer_id},\n    MIN(DATE(${2:order_date})) as first_date\n  FROM ${3:orders}\n  GROUP BY ${1:customer_id}\n),\ncohort AS (\n  SELECT\n    STRFTIME('%Y-%m', first_date) as cohort_month,\n    COUNT(*) as cohort_size\n  FROM first_purchase\n  GROUP BY cohort_month\n)\nSELECT * FROM cohort",
    insertTextRules: 4,
    documentation: 'Calculate customer retention by cohort',
    detail: 'Cohort analysis starter',
  },
  {
    label: 'Rank with ties',
    kind: 15,
    insertText:
      'SELECT\n  ${1:name},\n  ${2:score},\n  RANK() OVER (ORDER BY ${2:score} DESC) as rank,\n  DENSE_RANK() OVER (ORDER BY ${2:score} DESC) as dense_rank,\n  ROW_NUMBER() OVER (ORDER BY ${2:score} DESC) as row_num\nFROM ${3:table}',
    insertTextRules: 4,
    documentation: 'Compare different ranking methods',
    detail: 'RANK vs DENSE_RANK vs ROW_NUMBER',
  },

  // ===== STRING MANIPULATION ADVANCED =====
  {
    label: 'SUBSTRING_INDEX equivalent',
    kind: 15,
    insertText:
      "SELECT\n  SUBSTR(\n    ${1:column},\n    1,\n    INSTR(${1:column}, '${2:delimiter}') - 1\n  ) as before_delimiter,\n  SUBSTR(\n    ${1:column},\n    INSTR(${1:column}, '${2:delimiter}') + 1\n  ) as after_delimiter\nFROM ${3:table}",
    insertTextRules: 4,
    documentation: 'Split string by delimiter (first occurrence)',
    detail: 'Extract parts before and after delimiter',
  },
  {
    label: 'PAD LEFT (LPAD)',
    kind: 15,
    insertText:
      "SELECT\n  SUBSTR('${2:000000}' || ${1:column}, -${3:6}) as padded\nFROM ${4:table}",
    insertTextRules: 4,
    documentation: 'Left-pad string to specific length',
    detail: 'Useful for formatting IDs or numbers',
  },
  {
    label: 'PAD RIGHT (RPAD)',
    kind: 15,
    insertText:
      "SELECT\n  SUBSTR(${1:column} || '${2:      }', 1, ${3:10}) as padded\nFROM ${4:table}",
    insertTextRules: 4,
    documentation: 'Right-pad string to specific length',
    detail: 'Align text in fixed-width output',
  },
  {
    label: 'REVERSE string',
    kind: 15,
    insertText:
      "WITH RECURSIVE reverse_str(original, reversed, pos) AS (\n  SELECT ${1:column}, '', LENGTH(${1:column})\n  FROM ${2:table}\n  UNION ALL\n  SELECT original, SUBSTR(original, pos, 1) || reversed, pos - 1\n  FROM reverse_str\n  WHERE pos > 0\n)\nSELECT original, reversed\nFROM reverse_str\nWHERE pos = 0",
    insertTextRules: 4,
    documentation: 'Reverse a string using recursive CTE',
    detail: 'SQLite does not have built-in REVERSE',
  },
  {
    label: 'Title case conversion',
    kind: 15,
    insertText:
      'SELECT\n  UPPER(SUBSTR(${1:column}, 1, 1)) || LOWER(SUBSTR(${1:column}, 2)) as title_case\nFROM ${2:table}',
    insertTextRules: 4,
    documentation: 'Convert string to title case (first letter uppercase)',
    detail: 'Capitalize first character only',
  },
  {
    label: 'Remove all spaces',
    kind: 15,
    insertText:
      "SELECT REPLACE(${1:column}, ' ', '') as no_spaces\nFROM ${2:table}",
    insertTextRules: 4,
    documentation: 'Remove all whitespace from string',
    detail: 'Clean up text data',
  },
  {
    label: 'Extract numeric from string',
    kind: 15,
    insertText:
      "SELECT\n  CAST(\n    REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(\n      ${1:column},\n      'a', ''), 'b', ''), 'c', ''), 'd', ''), 'e', ''), 'f', ''), 'g', ''), 'h', ''), 'i', ''), 'j', '')\n    AS INTEGER\n  ) as numeric_value\nFROM ${2:table}",
    insertTextRules: 4,
    documentation: 'Extract numeric digits from alphanumeric string',
    detail: 'Basic pattern - extend for more letters',
  },
  {
    label: 'Check if string contains only digits',
    kind: 15,
    insertText:
      "SELECT\n  ${1:column},\n  CASE\n    WHEN ${1:column} GLOB '[0-9]*' THEN 1\n    ELSE 0\n  END as is_numeric\nFROM ${2:table}",
    insertTextRules: 4,
    documentation: 'Validate if string contains only digits',
    detail: 'Data validation pattern',
  },
  {
    label: 'Generate random string',
    kind: 15,
    insertText: 'SELECT\n  LOWER(HEX(RANDOMBLOB(${1:16}))) as random_string',
    insertTextRules: 4,
    documentation: 'Generate random hexadecimal string',
    detail: 'Useful for tokens or unique identifiers',
  },
  {
    label: 'Levenshtein distance (fuzzy match)',
    kind: 15,
    insertText:
      "-- Note: SQLite needs extension for Levenshtein\n-- This is a simplified example\nSELECT\n  ${1:text1},\n  ${2:text2},\n  CASE\n    WHEN ${1:text1} = ${2:text2} THEN 0\n    WHEN ${1:text1} LIKE '%' || ${2:text2} || '%' THEN 1\n    ELSE LENGTH(${1:text1}) + LENGTH(${2:text2})\n  END as similarity_score\nFROM ${3:table}",
    insertTextRules: 4,
    documentation: 'Basic fuzzy string matching (simplified)',
    detail: 'For real Levenshtein, use extension',
  },

  // ===== DATE/TIME ADVANCED =====
  {
    label: 'Calculate age from birthdate',
    kind: 15,
    insertText:
      "SELECT\n  ${1:name},\n  ${2:birthdate},\n  CAST((JULIANDAY('now') - JULIANDAY(${2:birthdate})) / 365.25 AS INTEGER) as age\nFROM ${3:table}",
    insertTextRules: 4,
    documentation: 'Calculate age in years from birthdate',
    detail: 'Accounts for leap years',
  },
  {
    label: 'Get first day of month',
    kind: 15,
    insertText:
      "SELECT DATE(${1:date}, 'start of month') as first_day\nFROM ${2:table}",
    insertTextRules: 4,
    documentation: 'Get first day of the month for a date',
    detail: 'Useful for grouping by month',
  },
  {
    label: 'Get last day of month',
    kind: 15,
    insertText:
      "SELECT DATE(${1:date}, 'start of month', '+1 month', '-1 day') as last_day\nFROM ${2:table}",
    insertTextRules: 4,
    documentation: 'Get last day of the month for a date',
    detail: 'Month-end calculations',
  },
  {
    label: 'Get day of week name',
    kind: 15,
    insertText:
      "SELECT\n  ${1:date},\n  CASE CAST(STRFTIME('%w', ${1:date}) AS INTEGER)\n    WHEN 0 THEN 'Sunday'\n    WHEN 1 THEN 'Monday'\n    WHEN 2 THEN 'Tuesday'\n    WHEN 3 THEN 'Wednesday'\n    WHEN 4 THEN 'Thursday'\n    WHEN 5 THEN 'Friday'\n    WHEN 6 THEN 'Saturday'\n  END as day_name\nFROM ${2:table}",
    insertTextRules: 4,
    documentation: 'Convert date to day of week name',
    detail: '%w returns 0-6 (Sunday-Saturday)',
  },
  {
    label: 'Get week number of year',
    kind: 15,
    insertText:
      "SELECT\n  ${1:date},\n  STRFTIME('%W', ${1:date}) as week_number\nFROM ${2:table}",
    insertTextRules: 4,
    documentation: 'Get ISO week number (00-53)',
    detail: '%W for week starting Monday',
  },
  {
    label: 'Get quarter from date',
    kind: 15,
    insertText:
      "SELECT\n  ${1:date},\n  CASE\n    WHEN CAST(STRFTIME('%m', ${1:date}) AS INTEGER) <= 3 THEN 1\n    WHEN CAST(STRFTIME('%m', ${1:date}) AS INTEGER) <= 6 THEN 2\n    WHEN CAST(STRFTIME('%m', ${1:date}) AS INTEGER) <= 9 THEN 3\n    ELSE 4\n  END as quarter\nFROM ${2:table}",
    insertTextRules: 4,
    documentation: 'Extract quarter (Q1-Q4) from date',
    detail: 'Fiscal quarter calculation',
  },
  {
    label: 'Check if weekend',
    kind: 15,
    insertText:
      "SELECT\n  ${1:date},\n  CASE\n    WHEN CAST(STRFTIME('%w', ${1:date}) AS INTEGER) IN (0, 6) THEN 1\n    ELSE 0\n  END as is_weekend\nFROM ${2:table}",
    insertTextRules: 4,
    documentation: 'Check if date falls on weekend',
    detail: '1 = weekend, 0 = weekday',
  },
  {
    label: 'Calculate business days between dates',
    kind: 15,
    insertText:
      "WITH RECURSIVE dates(date, end_date) AS (\n  SELECT DATE(${1:start_date}), DATE(${2:end_date})\n  UNION ALL\n  SELECT DATE(date, '+1 day'), end_date\n  FROM dates\n  WHERE date < end_date\n)\nSELECT\n  COUNT(*) as business_days\nFROM dates\nWHERE CAST(STRFTIME('%w', date) AS INTEGER) NOT IN (0, 6)",
    insertTextRules: 4,
    documentation: 'Count business days (excluding weekends) between two dates',
    detail: 'Does not account for holidays',
  },
  {
    label: 'Time elapsed in human readable format',
    kind: 15,
    insertText:
      "SELECT\n  ${1:date},\n  CASE\n    WHEN JULIANDAY('now') - JULIANDAY(${1:date}) < 1 THEN\n      CAST((JULIANDAY('now') - JULIANDAY(${1:date})) * 24 AS INTEGER) || ' hours ago'\n    WHEN JULIANDAY('now') - JULIANDAY(${1:date}) < 7 THEN\n      CAST(JULIANDAY('now') - JULIANDAY(${1:date}) AS INTEGER) || ' days ago'\n    WHEN JULIANDAY('now') - JULIANDAY(${1:date}) < 30 THEN\n      CAST((JULIANDAY('now') - JULIANDAY(${1:date})) / 7 AS INTEGER) || ' weeks ago'\n    ELSE\n      CAST((JULIANDAY('now') - JULIANDAY(${1:date})) / 30 AS INTEGER) || ' months ago'\n  END as time_ago\nFROM ${2:table}",
    insertTextRules: 4,
    documentation: 'Convert date to human-readable time ago format',
    detail: 'Social media style timestamps',
  },
  {
    label: 'Parse ISO 8601 datetime',
    kind: 15,
    insertText:
      "SELECT\n  ${1:iso_string},\n  DATETIME(REPLACE(${1:iso_string}, 'T', ' ')) as parsed_datetime\nFROM ${2:table}",
    insertTextRules: 4,
    documentation: 'Parse ISO 8601 datetime string',
    detail: 'Convert from ISO format',
  },
  {
    label: 'Generate calendar table',
    kind: 15,
    insertText:
      "WITH RECURSIVE calendar(date) AS (\n  SELECT DATE('${1:2024-01-01}')\n  UNION ALL\n  SELECT DATE(date, '+1 day')\n  FROM calendar\n  WHERE date < DATE('${2:2024-12-31}')\n)\nSELECT\n  date,\n  STRFTIME('%Y', date) as year,\n  STRFTIME('%m', date) as month,\n  STRFTIME('%d', date) as day,\n  STRFTIME('%w', date) as day_of_week,\n  STRFTIME('%W', date) as week_number\nFROM calendar",
    insertTextRules: 4,
    documentation: 'Generate a complete calendar dimension table',
    detail: 'Data warehouse calendar dimension',
  },

  // ===== MATH & STATISTICS =====
  {
    label: 'Calculate standard deviation',
    kind: 15,
    insertText:
      'SELECT\n  SQRT(\n    AVG(${1:column} * ${1:column}) - AVG(${1:column}) * AVG(${1:column})\n  ) as std_dev\nFROM ${2:table}',
    insertTextRules: 4,
    documentation: 'Calculate standard deviation of a column',
    detail: 'Population standard deviation',
  },
  {
    label: 'Calculate variance',
    kind: 15,
    insertText:
      'SELECT\n  AVG(${1:column} * ${1:column}) - AVG(${1:column}) * AVG(${1:column}) as variance\nFROM ${2:table}',
    insertTextRules: 4,
    documentation: 'Calculate variance of a column',
    detail: 'Statistical variance calculation',
  },
  {
    label: 'Calculate percentile',
    kind: 15,
    insertText:
      'WITH ranked AS (\n  SELECT\n    ${1:column},\n    ROW_NUMBER() OVER (ORDER BY ${1:column}) as rn,\n    COUNT(*) OVER () as total\n  FROM ${2:table}\n)\nSELECT ${1:column}\nFROM ranked\nWHERE rn = CAST(total * ${3:0.95} AS INTEGER)',
    insertTextRules: 4,
    documentation: 'Calculate Nth percentile value',
    detail: 'Example: 0.95 for 95th percentile',
  },
  {
    label: 'Moving average (last N rows)',
    kind: 15,
    insertText:
      'SELECT\n  ${1:date},\n  ${2:value},\n  AVG(${2:value}) OVER (\n    ORDER BY ${1:date}\n    ROWS BETWEEN ${3:6} PRECEDING AND CURRENT ROW\n  ) as moving_avg\nFROM ${4:table}',
    insertTextRules: 4,
    documentation: 'Calculate moving average over last N rows',
    detail: 'Smoothing trend analysis',
  },
  {
    label: 'Exponential moving average',
    kind: 15,
    insertText:
      'WITH RECURSIVE ema AS (\n  SELECT\n    ${1:date},\n    ${2:value},\n    ${2:value} as ema,\n    ROW_NUMBER() OVER (ORDER BY ${1:date}) as rn\n  FROM ${3:table}\n  WHERE ${1:date} = (SELECT MIN(${1:date}) FROM ${3:table})\n  \n  UNION ALL\n  \n  SELECT\n    t.${1:date},\n    t.${2:value},\n    (t.${2:value} * ${4:0.2}) + (e.ema * (1 - ${4:0.2})),\n    e.rn + 1\n  FROM ${3:table} t\n  JOIN ema e\n  ON t.${1:date} > e.${1:date}\n  ORDER BY t.${1:date}\n  LIMIT 1\n)\nSELECT * FROM ema',
    insertTextRules: 4,
    documentation: 'Calculate exponential moving average',
    detail: 'Weighted moving average (alpha = smoothing factor)',
  },
  {
    label: 'Z-score calculation',
    kind: 15,
    insertText:
      'WITH stats AS (\n  SELECT\n    AVG(${1:column}) as mean,\n    SQRT(AVG(${1:column} * ${1:column}) - AVG(${1:column}) * AVG(${1:column})) as std_dev\n  FROM ${2:table}\n)\nSELECT\n  ${1:column},\n  (${1:column} - stats.mean) / NULLIF(stats.std_dev, 0) as z_score\nFROM ${2:table}, stats',
    insertTextRules: 4,
    documentation: 'Calculate z-score (standard score) for each value',
    detail: 'Identify outliers (|z| > 3)',
  },
  {
    label: 'Correlation coefficient',
    kind: 15,
    insertText:
      'WITH stats AS (\n  SELECT\n    COUNT(*) as n,\n    SUM(${1:x}) as sum_x,\n    SUM(${2:y}) as sum_y,\n    SUM(${1:x} * ${1:x}) as sum_x2,\n    SUM(${2:y} * ${2:y}) as sum_y2,\n    SUM(${1:x} * ${2:y}) as sum_xy\n  FROM ${3:table}\n)\nSELECT\n  (n * sum_xy - sum_x * sum_y) /\n  SQRT((n * sum_x2 - sum_x * sum_x) * (n * sum_y2 - sum_y * sum_y)) as correlation\nFROM stats',
    insertTextRules: 4,
    documentation:
      'Calculate Pearson correlation coefficient between two variables',
    detail: 'Measure linear relationship (-1 to 1)',
  },
  {
    label: 'Linear regression slope',
    kind: 15,
    insertText:
      'WITH stats AS (\n  SELECT\n    COUNT(*) as n,\n    AVG(${1:x}) as mean_x,\n    AVG(${2:y}) as mean_y,\n    SUM((${1:x} - (SELECT AVG(${1:x}) FROM ${3:table})) * (${2:y} - (SELECT AVG(${2:y}) FROM ${3:table}))) as covariance,\n    SUM((${1:x} - (SELECT AVG(${1:x}) FROM ${3:table})) * (${1:x} - (SELECT AVG(${1:x}) FROM ${3:table}))) as variance_x\n  FROM ${3:table}\n)\nSELECT\n  covariance / NULLIF(variance_x, 0) as slope,\n  mean_y - (covariance / NULLIF(variance_x, 0)) * mean_x as intercept\nFROM stats',
    insertTextRules: 4,
    documentation: 'Calculate linear regression slope and intercept',
    detail: 'y = slope * x + intercept',
  },
  {
    label: 'Cumulative distribution',
    kind: 15,
    insertText:
      'SELECT\n  ${1:value},\n  COUNT(*) as frequency,\n  SUM(COUNT(*)) OVER (ORDER BY ${1:value}) as cumulative_frequency,\n  CAST(SUM(COUNT(*)) OVER (ORDER BY ${1:value}) AS REAL) / SUM(COUNT(*)) OVER () as cumulative_percentage\nFROM ${2:table}\nGROUP BY ${1:value}\nORDER BY ${1:value}',
    insertTextRules: 4,
    documentation: 'Calculate cumulative distribution function',
    detail: 'Show frequency and cumulative percentage',
  },
  {
    label: 'Histogram bins',
    kind: 15,
    insertText:
      'SELECT\n  CAST((${1:column} - (SELECT MIN(${1:column}) FROM ${2:table})) / ${3:10} AS INTEGER) as bin,\n  COUNT(*) as frequency,\n  CAST((${1:column} - (SELECT MIN(${1:column}) FROM ${2:table})) / ${3:10} AS INTEGER) * ${3:10} + (SELECT MIN(${1:column}) FROM ${2:table}) as bin_start\nFROM ${2:table}\nGROUP BY bin\nORDER BY bin',
    insertTextRules: 4,
    documentation: 'Create histogram bins for numeric data',
    detail: 'Group values into equal-width bins',
  },

  // ===== GRAPH & HIERARCHY =====
  {
    label: 'Find all descendants (recursive)',
    kind: 15,
    insertText:
      'WITH RECURSIVE descendants(id, name, parent_id, depth) AS (\n  SELECT id, name, parent_id, 0\n  FROM ${1:table}\n  WHERE id = ${2:root_id}\n  \n  UNION ALL\n  \n  SELECT t.id, t.name, t.parent_id, d.depth + 1\n  FROM ${1:table} t\n  JOIN descendants d ON t.parent_id = d.id\n)\nSELECT * FROM descendants',
    insertTextRules: 4,
    documentation: 'Find all descendants of a node in hierarchical data',
    detail: 'Top-down tree traversal',
  },
  {
    label: 'Find all ancestors (recursive)',
    kind: 15,
    insertText:
      'WITH RECURSIVE ancestors(id, name, parent_id, depth) AS (\n  SELECT id, name, parent_id, 0\n  FROM ${1:table}\n  WHERE id = ${2:leaf_id}\n  \n  UNION ALL\n  \n  SELECT t.id, t.name, t.parent_id, a.depth + 1\n  FROM ${1:table} t\n  JOIN ancestors a ON a.parent_id = t.id\n)\nSELECT * FROM ancestors',
    insertTextRules: 4,
    documentation: 'Find all ancestors of a node in hierarchical data',
    detail: 'Bottom-up tree traversal',
  },
  {
    label: 'Find siblings',
    kind: 15,
    insertText:
      'SELECT s.*\nFROM ${1:table} s\nWHERE s.parent_id = (\n  SELECT parent_id\n  FROM ${1:table}\n  WHERE id = ${2:node_id}\n)\n  AND s.id != ${2:node_id}',
    insertTextRules: 4,
    documentation: 'Find all siblings of a node',
    detail: 'Nodes with same parent',
  },
  {
    label: 'Calculate tree depth',
    kind: 15,
    insertText:
      'WITH RECURSIVE depth(id, level) AS (\n  SELECT id, 0\n  FROM ${1:table}\n  WHERE parent_id IS NULL\n  \n  UNION ALL\n  \n  SELECT t.id, d.level + 1\n  FROM ${1:table} t\n  JOIN depth d ON t.parent_id = d.id\n)\nSELECT id, MAX(level) as max_depth\nFROM depth\nGROUP BY id\nORDER BY max_depth DESC\nLIMIT 1',
    insertTextRules: 4,
    documentation: 'Calculate maximum depth of hierarchical tree',
    detail: 'Find deepest level in tree',
  },
  {
    label: 'Find leaf nodes',
    kind: 15,
    insertText:
      'SELECT p.*\nFROM ${1:table} p\nLEFT JOIN ${1:table} c ON c.parent_id = p.id\nWHERE c.id IS NULL',
    insertTextRules: 4,
    documentation: 'Find all leaf nodes (nodes without children)',
    detail: 'End nodes in tree structure',
  },
  {
    label: 'Find root nodes',
    kind: 15,
    insertText: 'SELECT *\nFROM ${1:table}\nWHERE parent_id IS NULL',
    insertTextRules: 4,
    documentation: 'Find all root nodes (nodes without parents)',
    detail: 'Top-level nodes in tree',
  },
  {
    label: 'Shortest path between nodes (graph)',
    kind: 15,
    insertText:
      "WITH RECURSIVE paths(node, path, hops) AS (\n  SELECT ${1:end_node}, CAST(${1:end_node} AS TEXT), 0\n  \n  UNION ALL\n  \n  SELECT\n    e.${2:from_node},\n    CAST(e.${2:from_node} AS TEXT) || ' -> ' || p.path,\n    p.hops + 1\n  FROM ${3:edges_table} e\n  JOIN paths p ON e.${4:to_node} = p.node\n  WHERE p.hops < ${5:10}\n    AND INSTR(p.path, e.${2:from_node}) = 0\n)\nSELECT *\nFROM paths\nWHERE node = ${6:start_node}\nORDER BY hops\nLIMIT 1",
    insertTextRules: 4,
    documentation: 'Find shortest path between two nodes in a graph',
    detail: 'Breadth-first search pattern',
  },

  // ===== DATA QUALITY & VALIDATION =====
  {
    label: 'Find NULL values summary',
    kind: 15,
    insertText:
      'SELECT\n  COUNT(*) as total_rows,\n  SUM(CASE WHEN ${1:column1} IS NULL THEN 1 ELSE 0 END) as ${1:column1}_nulls,\n  SUM(CASE WHEN ${2:column2} IS NULL THEN 1 ELSE 0 END) as ${2:column2}_nulls,\n  SUM(CASE WHEN ${3:column3} IS NULL THEN 1 ELSE 0 END) as ${3:column3}_nulls\nFROM ${4:table}',
    insertTextRules: 4,
    documentation: 'Count NULL values across multiple columns',
    detail: 'Data quality assessment',
  },
  {
    label: 'Find empty strings',
    kind: 15,
    insertText:
      "SELECT *\nFROM ${1:table}\nWHERE ${2:column} = ''\n   OR ${2:column} IS NULL\n   OR TRIM(${2:column}) = ''",
    insertTextRules: 4,
    documentation: 'Find rows with empty or whitespace-only strings',
    detail: 'Data cleaning query',
  },
  {
    label: 'Validate email format',
    kind: 15,
    insertText:
      "SELECT\n  ${1:email},\n  CASE\n    WHEN ${1:email} LIKE '%@%.%'\n      AND ${1:email} NOT LIKE '%@%@%'\n      AND LENGTH(${1:email}) > 5\n      THEN 1\n    ELSE 0\n  END as is_valid_email\nFROM ${2:table}",
    insertTextRules: 4,
    documentation: 'Basic email format validation',
    detail: 'Simple pattern matching for emails',
  },
  {
    label: 'Validate phone number format',
    kind: 15,
    insertText:
      "SELECT\n  ${1:phone},\n  CASE\n    WHEN ${1:phone} GLOB '[0-9][0-9][0-9]-[0-9][0-9][0-9]-[0-9][0-9][0-9][0-9]'\n      OR ${1:phone} GLOB '([0-9][0-9][0-9]) [0-9][0-9][0-9]-[0-9][0-9][0-9][0-9]'\n      THEN 1\n    ELSE 0\n  END as is_valid_phone\nFROM ${2:table}",
    insertTextRules: 4,
    documentation: 'Validate US phone number format',
    detail: 'Supports XXX-XXX-XXXX and (XXX) XXX-XXXX',
  },
  {
    label: 'Find outliers using IQR',
    kind: 15,
    insertText:
      'WITH quartiles AS (\n  SELECT\n    ${1:column},\n    NTILE(4) OVER (ORDER BY ${1:column}) as quartile\n  FROM ${2:table}\n),\niqr_calc AS (\n  SELECT\n    MAX(CASE WHEN quartile = 1 THEN ${1:column} END) as q1,\n    MAX(CASE WHEN quartile = 3 THEN ${1:column} END) as q3\n  FROM quartiles\n),\nbounds AS (\n  SELECT\n    q1,\n    q3,\n    q3 - q1 as iqr,\n    q1 - (1.5 * (q3 - q1)) as lower_bound,\n    q3 + (1.5 * (q3 - q1)) as upper_bound\n  FROM iqr_calc\n)\nSELECT t.*\nFROM ${2:table} t, bounds\nWHERE t.${1:column} < bounds.lower_bound\n   OR t.${1:column} > bounds.upper_bound',
    insertTextRules: 4,
    documentation: 'Detect outliers using Interquartile Range (IQR) method',
    detail: 'Statistical outlier detection',
  },
  {
    label: 'Data profiling summary',
    kind: 15,
    insertText:
      "SELECT\n  '${1:column}' as column_name,\n  COUNT(*) as total_rows,\n  COUNT(${1:column}) as non_null_count,\n  COUNT(*) - COUNT(${1:column}) as null_count,\n  COUNT(DISTINCT ${1:column}) as distinct_count,\n  MIN(${1:column}) as min_value,\n  MAX(${1:column}) as max_value,\n  AVG(${1:column}) as avg_value\nFROM ${2:table}",
    insertTextRules: 4,
    documentation: 'Generate comprehensive data profile for a column',
    detail: 'Statistical summary of column',
  },
  {
    label: 'Find referential integrity issues',
    kind: 15,
    insertText:
      'SELECT c.*\nFROM ${1:child_table} c\nLEFT JOIN ${2:parent_table} p ON c.${3:foreign_key} = p.${4:primary_key}\nWHERE p.${4:primary_key} IS NULL\n  AND c.${3:foreign_key} IS NOT NULL',
    insertTextRules: 4,
    documentation: 'Find orphaned records (referential integrity violations)',
    detail: 'Child records with no matching parent',
  },
  {
    label: 'Detect duplicate IDs',
    kind: 15,
    insertText:
      'SELECT\n  ${1:id},\n  COUNT(*) as occurrence_count,\n  GROUP_CONCAT(rowid) as rowids\nFROM ${2:table}\nGROUP BY ${1:id}\nHAVING COUNT(*) > 1',
    insertTextRules: 4,
    documentation: 'Find duplicate primary key values',
    detail: 'Data quality issue detection',
  },

  // ===== SAMPLING & TESTING =====
  {
    label: 'Random sample of rows',
    kind: 15,
    insertText: 'SELECT *\nFROM ${1:table}\nORDER BY RANDOM()\nLIMIT ${2:100}',
    insertTextRules: 4,
    documentation: 'Get random sample of N rows',
    detail: 'Useful for testing with subset of data',
  },
  {
    label: 'Random percentage sample',
    kind: 15,
    insertText:
      'SELECT *\nFROM ${1:table}\nWHERE ABS(RANDOM()) % 100 < ${2:10}',
    insertTextRules: 4,
    documentation: 'Get random percentage sample (e.g., 10%)',
    detail: 'Approximate percentage sampling',
  },
  {
    label: 'Stratified random sample',
    kind: 15,
    insertText:
      'WITH numbered AS (\n  SELECT\n    *,\n    ROW_NUMBER() OVER (PARTITION BY ${1:category} ORDER BY RANDOM()) as rn\n  FROM ${2:table}\n)\nSELECT *\nFROM numbered\nWHERE rn <= ${3:10}',
    insertTextRules: 4,
    documentation: 'Get N random rows per category (stratified sampling)',
    detail: 'Maintain proportional representation',
  },
  {
    label: 'Generate test data',
    kind: 15,
    insertText:
      "WITH RECURSIVE test_data(id, name, value, created_at) AS (\n  SELECT\n    1,\n    'User_' || 1,\n    ABS(RANDOM() % 1000),\n    DATETIME('now', '-' || (ABS(RANDOM() % 365)) || ' days')\n  \n  UNION ALL\n  \n  SELECT\n    id + 1,\n    'User_' || (id + 1),\n    ABS(RANDOM() % 1000),\n    DATETIME('now', '-' || (ABS(RANDOM() % 365)) || ' days')\n  FROM test_data\n  WHERE id < ${1:1000}\n)\nSELECT * FROM test_data",
    insertTextRules: 4,
    documentation: 'Generate synthetic test data',
    detail: 'Create random test records',
  },
  {
    label: 'Create lookup/dimension table',
    kind: 15,
    insertText:
      'CREATE TABLE ${1:dim_table} AS\nSELECT DISTINCT\n  ROW_NUMBER() OVER (ORDER BY ${2:column}) as ${1:dim_table}_id,\n  ${2:column}\nFROM ${3:source_table}\nWHERE ${2:column} IS NOT NULL\nORDER BY ${2:column}',
    insertTextRules: 4,
    documentation: 'Create dimension table from distinct values',
    detail: 'Data warehouse dimension pattern',
  },

  // ===== PERFORMANCE MONITORING =====
  {
    label: 'Query execution time',
    kind: 15,
    insertText: '.timer ON\n${1:SELECT * FROM table}\n.timer OFF',
    insertTextRules: 4,
    documentation: 'Measure query execution time (SQLite CLI)',
    detail: 'Use .timer command in CLI',
  },
  {
    label: 'Show query plan with cost',
    kind: 15,
    insertText: 'EXPLAIN QUERY PLAN\n${1:SELECT * FROM table}',
    insertTextRules: 4,
    documentation: 'Display query execution plan to analyze performance',
    detail: 'Look for SCAN vs SEARCH operations',
  },
  {
    label: 'Index usage analysis',
    kind: 15,
    insertText:
      "SELECT\n  name,\n  tbl_name,\n  sql\nFROM sqlite_master\nWHERE type = 'index'\n  AND tbl_name = '${1:table_name}'\nORDER BY name",
    insertTextRules: 4,
    documentation: 'List all indexes on a specific table',
    detail: 'Review index coverage',
  },
  {
    label: 'Unused indexes detection',
    kind: 15,
    insertText:
      "-- Check EXPLAIN QUERY PLAN for your common queries\n-- Indexes not mentioned in query plans may be unused\nSELECT\n  m.name as index_name,\n  m.tbl_name as table_name,\n  m.sql as definition\nFROM sqlite_master m\nWHERE m.type = 'index'\n  AND m.name NOT LIKE 'sqlite_%'",
    insertTextRules: 4,
    documentation: 'List candidate indexes for review',
    detail: 'Manually check if used in EXPLAIN QUERY PLAN',
  },

  // ===== NORMALIZATION & DATABASE DESIGN =====
  {
    label: '1NF: Eliminate repeating groups',
    kind: 15,
    insertText:
      '-- First Normal Form Example\n-- BAD: Repeating columns\n-- CREATE TABLE orders (id, item1, item2, item3);\n\n-- GOOD: Separate table for items\nCREATE TABLE ${1:orders} (\n  order_id INTEGER PRIMARY KEY AUTOINCREMENT,\n  customer_id INTEGER NOT NULL,\n  order_date DATE DEFAULT CURRENT_DATE\n);\n\nCREATE TABLE ${2:order_items} (\n  item_id INTEGER PRIMARY KEY AUTOINCREMENT,\n  order_id INTEGER NOT NULL,\n  product_name TEXT NOT NULL,\n  quantity INTEGER NOT NULL,\n  FOREIGN KEY (order_id) REFERENCES ${1:orders}(order_id)\n);',
    insertTextRules: 4,
    documentation:
      'First Normal Form: Each column should contain atomic values',
    detail: 'Eliminate repeating groups and multi-valued columns',
  },
  {
    label: '2NF: Remove partial dependencies',
    kind: 15,
    insertText:
      '-- Second Normal Form Example\n-- Requires composite key columns to depend on entire key\n\nCREATE TABLE ${1:students} (\n  student_id INTEGER PRIMARY KEY,\n  student_name TEXT NOT NULL,\n  email TEXT UNIQUE\n);\n\nCREATE TABLE ${2:courses} (\n  course_id INTEGER PRIMARY KEY,\n  course_name TEXT NOT NULL,\n  credits INTEGER\n);\n\nCREATE TABLE ${3:enrollments} (\n  student_id INTEGER,\n  course_id INTEGER,\n  enrollment_date DATE,\n  grade TEXT,\n  PRIMARY KEY (student_id, course_id),\n  FOREIGN KEY (student_id) REFERENCES ${1:students}(student_id),\n  FOREIGN KEY (course_id) REFERENCES ${2:courses}(course_id)\n);',
    insertTextRules: 4,
    documentation:
      'Second Normal Form: Remove partial dependencies on composite keys',
    detail: 'All non-key columns must depend on entire primary key',
  },
  {
    label: '3NF: Eliminate transitive dependencies',
    kind: 15,
    insertText:
      '-- Third Normal Form Example\n-- BAD: department_name depends on department_id, not employee_id\n-- CREATE TABLE employees (id, name, dept_id, dept_name);\n\n-- GOOD: Separate department table\nCREATE TABLE ${1:departments} (\n  department_id INTEGER PRIMARY KEY,\n  department_name TEXT NOT NULL,\n  location TEXT\n);\n\nCREATE TABLE ${2:employees} (\n  employee_id INTEGER PRIMARY KEY,\n  employee_name TEXT NOT NULL,\n  department_id INTEGER,\n  hire_date DATE,\n  FOREIGN KEY (department_id) REFERENCES ${1:departments}(department_id)\n);',
    insertTextRules: 4,
    documentation: 'Third Normal Form: Remove transitive dependencies',
    detail: 'Non-key columns should depend only on primary key',
  },
  {
    label: 'Star schema (data warehouse)',
    kind: 15,
    insertText:
      '-- Star Schema: Central fact table with dimension tables\n\n-- Fact Table (center)\nCREATE TABLE ${1:fact_sales} (\n  sale_id INTEGER PRIMARY KEY,\n  date_key INTEGER,\n  product_key INTEGER,\n  customer_key INTEGER,\n  store_key INTEGER,\n  quantity INTEGER,\n  revenue REAL,\n  cost REAL,\n  profit REAL,\n  FOREIGN KEY (date_key) REFERENCES ${2:dim_date}(date_key),\n  FOREIGN KEY (product_key) REFERENCES ${3:dim_product}(product_key),\n  FOREIGN KEY (customer_key) REFERENCES ${4:dim_customer}(customer_key),\n  FOREIGN KEY (store_key) REFERENCES ${5:dim_store}(store_key)\n);\n\n-- Dimension Tables (points of star)\nCREATE TABLE ${2:dim_date} (\n  date_key INTEGER PRIMARY KEY,\n  full_date DATE,\n  year INTEGER,\n  quarter INTEGER,\n  month INTEGER,\n  day INTEGER,\n  day_of_week TEXT\n);\n\nCREATE TABLE ${3:dim_product} (\n  product_key INTEGER PRIMARY KEY,\n  product_name TEXT,\n  category TEXT,\n  brand TEXT,\n  unit_price REAL\n);',
    insertTextRules: 4,
    documentation: 'Star schema design for data warehousing',
    detail: 'Optimized for analytical queries (OLAP)',
  },
  {
    label: 'Snowflake schema (normalized dimensions)',
    kind: 15,
    insertText:
      '-- Snowflake Schema: Normalized dimension tables\n\nCREATE TABLE ${1:fact_sales} (\n  sale_id INTEGER PRIMARY KEY,\n  product_key INTEGER,\n  quantity INTEGER,\n  revenue REAL,\n  FOREIGN KEY (product_key) REFERENCES ${2:dim_product}(product_key)\n);\n\nCREATE TABLE ${2:dim_product} (\n  product_key INTEGER PRIMARY KEY,\n  product_name TEXT,\n  subcategory_key INTEGER,\n  FOREIGN KEY (subcategory_key) REFERENCES ${3:dim_subcategory}(subcategory_key)\n);\n\nCREATE TABLE ${3:dim_subcategory} (\n  subcategory_key INTEGER PRIMARY KEY,\n  subcategory_name TEXT,\n  category_key INTEGER,\n  FOREIGN KEY (category_key) REFERENCES ${4:dim_category}(category_key)\n);\n\nCREATE TABLE ${4:dim_category} (\n  category_key INTEGER PRIMARY KEY,\n  category_name TEXT,\n  department TEXT\n);',
    insertTextRules: 4,
    documentation: 'Snowflake schema: Normalized dimension tables',
    detail: 'Reduces redundancy but adds join complexity',
  },

  // ===== ADVANCED WINDOW FUNCTIONS =====
  {
    label: 'FIRST_VALUE window function',
    kind: 15,
    insertText:
      'SELECT\n  ${1:category},\n  ${2:date},\n  ${3:value},\n  FIRST_VALUE(${3:value}) OVER (\n    PARTITION BY ${1:category}\n    ORDER BY ${2:date}\n    ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING\n  ) as first_value\nFROM ${4:table}',
    insertTextRules: 4,
    documentation: 'Get first value in each partition',
    detail: 'Useful for baseline comparisons',
  },
  {
    label: 'LAST_VALUE window function',
    kind: 15,
    insertText:
      'SELECT\n  ${1:category},\n  ${2:date},\n  ${3:value},\n  LAST_VALUE(${3:value}) OVER (\n    PARTITION BY ${1:category}\n    ORDER BY ${2:date}\n    ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING\n  ) as last_value\nFROM ${4:table}',
    insertTextRules: 4,
    documentation: 'Get last value in each partition',
    detail: 'Note: Requires UNBOUNDED FOLLOWING frame',
  },
  {
    label: 'NTH_VALUE window function',
    kind: 15,
    insertText:
      'SELECT\n  ${1:category},\n  ${2:value},\n  NTH_VALUE(${2:value}, ${3:3}) OVER (\n    PARTITION BY ${1:category}\n    ORDER BY ${2:value} DESC\n  ) as third_highest\nFROM ${4:table}',
    insertTextRules: 4,
    documentation: 'Get Nth value in ordered partition',
    detail: 'Access specific position in window',
  },
  {
    label: 'PERCENT_RANK window function',
    kind: 15,
    insertText:
      'SELECT\n  ${1:name},\n  ${2:score},\n  ROUND(PERCENT_RANK() OVER (ORDER BY ${2:score} DESC) * 100, 2) as percentile\nFROM ${3:table}',
    insertTextRules: 4,
    documentation: 'Calculate relative rank as percentage (0 to 1)',
    detail: 'Shows position as percentage of total',
  },
  {
    label: 'CUME_DIST window function',
    kind: 15,
    insertText:
      'SELECT\n  ${1:value},\n  COUNT(*) as frequency,\n  ROUND(CUME_DIST() OVER (ORDER BY ${1:value}) * 100, 2) as cumulative_pct\nFROM ${2:table}\nGROUP BY ${1:value}',
    insertTextRules: 4,
    documentation: 'Calculate cumulative distribution',
    detail: 'Percentage of values <= current value',
  },
  {
    label: 'Window frame: RANGE vs ROWS',
    kind: 15,
    insertText:
      "SELECT\n  ${1:date},\n  ${2:value},\n  -- ROWS: Physical row count\n  SUM(${2:value}) OVER (\n    ORDER BY ${1:date}\n    ROWS BETWEEN 2 PRECEDING AND CURRENT ROW\n  ) as sum_last_3_rows,\n  -- RANGE: Logical range based on value\n  SUM(${2:value}) OVER (\n    ORDER BY ${1:date}\n    RANGE BETWEEN INTERVAL '2 days' PRECEDING AND CURRENT ROW\n  ) as sum_last_3_days\nFROM ${3:table}",
    insertTextRules: 4,
    documentation: 'Compare ROWS vs RANGE window frame types',
    detail: 'ROWS=physical, RANGE=logical',
  },
  {
    label: 'Sliding window with exclusions',
    kind: 15,
    insertText:
      'SELECT\n  ${1:date},\n  ${2:value},\n  AVG(${2:value}) OVER (\n    ORDER BY ${1:date}\n    ROWS BETWEEN 3 PRECEDING AND 1 PRECEDING\n  ) as avg_previous_3,\n  AVG(${2:value}) OVER (\n    ORDER BY ${1:date}\n    ROWS BETWEEN 1 FOLLOWING AND 3 FOLLOWING\n  ) as avg_next_3\nFROM ${3:table}',
    insertTextRules: 4,
    documentation: 'Sliding window excluding current row',
    detail: 'Look before or after current row',
  },

  // ===== KPI CALCULATIONS =====
  {
    label: 'Customer Lifetime Value (CLV)',
    kind: 15,
    insertText:
      'SELECT\n  ${1:customer_id},\n  COUNT(DISTINCT ${2:order_id}) as total_orders,\n  SUM(${3:order_total}) as total_revenue,\n  AVG(${3:order_total}) as avg_order_value,\n  SUM(${3:order_total}) / COUNT(DISTINCT ${2:order_id}) as revenue_per_order,\n  JULIANDAY(MAX(${4:order_date})) - JULIANDAY(MIN(${4:order_date})) as customer_lifespan_days,\n  SUM(${3:order_total}) / NULLIF((JULIANDAY(MAX(${4:order_date})) - JULIANDAY(MIN(${4:order_date}))) / 365.25, 0) as revenue_per_year\nFROM ${5:orders}\nGROUP BY ${1:customer_id}',
    insertTextRules: 4,
    documentation: 'Calculate Customer Lifetime Value metrics',
    detail: 'Essential for customer analytics',
  },
  {
    label: 'Churn rate calculation',
    kind: 15,
    insertText:
      "WITH active_users AS (\n  SELECT\n    STRFTIME('%Y-%m', ${1:date}) as month,\n    COUNT(DISTINCT ${2:user_id}) as active_count\n  FROM ${3:activity_table}\n  GROUP BY month\n),\nchurned AS (\n  SELECT\n    STRFTIME('%Y-%m', DATE(a1.last_active, '+1 month')) as churn_month,\n    COUNT(DISTINCT a1.${2:user_id}) as churned_count\n  FROM (\n    SELECT ${2:user_id}, MAX(${1:date}) as last_active\n    FROM ${3:activity_table}\n    GROUP BY ${2:user_id}\n  ) a1\n  LEFT JOIN ${3:activity_table} a2\n    ON a1.${2:user_id} = a2.${2:user_id}\n    AND a2.${1:date} > DATE(a1.last_active, '+1 month')\n  WHERE a2.${2:user_id} IS NULL\n  GROUP BY churn_month\n)\nSELECT\n  c.churn_month,\n  c.churned_count,\n  a.active_count,\n  ROUND(CAST(c.churned_count AS REAL) / a.active_count * 100, 2) as churn_rate_pct\nFROM churned c\nJOIN active_users a\n  ON c.churn_month = a.month",
    insertTextRules: 4,
    documentation: 'Calculate monthly churn rate',
    detail: 'Track customer retention over time',
  },
  {
    label: 'Monthly Recurring Revenue (MRR)',
    kind: 15,
    insertText:
      "SELECT\n  STRFTIME('%Y-%m', ${1:subscription_date}) as month,\n  SUM(${2:monthly_amount}) as mrr,\n  SUM(CASE WHEN ${3:subscription_type} = 'new' THEN ${2:monthly_amount} ELSE 0 END) as new_mrr,\n  SUM(CASE WHEN ${3:subscription_type} = 'expansion' THEN ${2:monthly_amount} ELSE 0 END) as expansion_mrr,\n  SUM(CASE WHEN ${3:subscription_type} = 'contraction' THEN ${2:monthly_amount} ELSE 0 END) as contraction_mrr,\n  SUM(CASE WHEN ${3:subscription_type} = 'churn' THEN ${2:monthly_amount} ELSE 0 END) as churned_mrr\nFROM ${4:subscriptions}\nGROUP BY month\nORDER BY month",
    insertTextRules: 4,
    documentation: 'Calculate Monthly Recurring Revenue and its components',
    detail: 'SaaS business metric',
  },
  {
    label: 'Conversion funnel analysis',
    kind: 15,
    insertText:
      "WITH funnel AS (\n  SELECT\n    COUNT(DISTINCT CASE WHEN ${1:event} = '${2:view}' THEN ${3:user_id} END) as step1_views,\n    COUNT(DISTINCT CASE WHEN ${1:event} = '${4:click}' THEN ${3:user_id} END) as step2_clicks,\n    COUNT(DISTINCT CASE WHEN ${1:event} = '${5:signup}' THEN ${3:user_id} END) as step3_signups,\n    COUNT(DISTINCT CASE WHEN ${1:event} = '${6:purchase}' THEN ${3:user_id} END) as step4_purchases\n  FROM ${7:events}\n  WHERE ${8:date} BETWEEN '${9:2024-01-01}' AND '${10:2024-12-31}'\n)\nSELECT\n  step1_views,\n  step2_clicks,\n  ROUND(CAST(step2_clicks AS REAL) / step1_views * 100, 2) as view_to_click_pct,\n  step3_signups,\n  ROUND(CAST(step3_signups AS REAL) / step2_clicks * 100, 2) as click_to_signup_pct,\n  step4_purchases,\n  ROUND(CAST(step4_purchases AS REAL) / step3_signups * 100, 2) as signup_to_purchase_pct,\n  ROUND(CAST(step4_purchases AS REAL) / step1_views * 100, 2) as overall_conversion_pct\nFROM funnel",
    insertTextRules: 4,
    documentation: 'Analyze conversion funnel with drop-off rates',
    detail: 'Identify bottlenecks in user journey',
  },
  {
    label: 'Revenue growth rate',
    kind: 15,
    insertText:
      "WITH monthly_revenue AS (\n  SELECT\n    STRFTIME('%Y-%m', ${1:date}) as month,\n    SUM(${2:revenue}) as total_revenue\n  FROM ${3:sales}\n  GROUP BY month\n)\nSELECT\n  month,\n  total_revenue,\n  LAG(total_revenue) OVER (ORDER BY month) as previous_month_revenue,\n  total_revenue - LAG(total_revenue) OVER (ORDER BY month) as revenue_growth,\n  ROUND(\n    (total_revenue - LAG(total_revenue) OVER (ORDER BY month)) * 100.0 /\n    NULLIF(LAG(total_revenue) OVER (ORDER BY month), 0),\n    2\n  ) as growth_rate_pct\nFROM monthly_revenue\nORDER BY month",
    insertTextRules: 4,
    documentation: 'Calculate month-over-month revenue growth rate',
    detail: 'Track business growth trends',
  },
  {
    label: 'Customer acquisition cost (CAC)',
    kind: 15,
    insertText:
      "WITH marketing_spend AS (\n  SELECT\n    STRFTIME('%Y-%m', ${1:date}) as month,\n    SUM(${2:spend_amount}) as total_marketing_spend\n  FROM ${3:marketing_expenses}\n  GROUP BY month\n),\nnew_customers AS (\n  SELECT\n    STRFTIME('%Y-%m', ${4:signup_date}) as month,\n    COUNT(DISTINCT ${5:customer_id}) as new_customer_count\n  FROM ${6:customers}\n  GROUP BY month\n)\nSELECT\n  m.month,\n  m.total_marketing_spend,\n  n.new_customer_count,\n  ROUND(m.total_marketing_spend / NULLIF(n.new_customer_count, 0), 2) as cac\nFROM marketing_spend m\nJOIN new_customers n ON m.month = n.month\nORDER BY m.month",
    insertTextRules: 4,
    documentation: 'Calculate Customer Acquisition Cost per month',
    detail: 'Marketing efficiency metric',
  },
  {
    label: 'Inventory turnover ratio',
    kind: 15,
    insertText:
      "WITH cogs AS (\n  SELECT SUM(${1:cost}) as total_cogs\n  FROM ${2:sales}\n  WHERE ${3:date} BETWEEN '${4:2024-01-01}' AND '${5:2024-12-31}'\n),\navg_inventory AS (\n  SELECT AVG(${6:inventory_value}) as avg_inventory\n  FROM ${7:inventory_snapshots}\n  WHERE ${8:snapshot_date} BETWEEN '${4:2024-01-01}' AND '${5:2024-12-31}'\n)\nSELECT\n  c.total_cogs,\n  a.avg_inventory,\n  ROUND(c.total_cogs / NULLIF(a.avg_inventory, 0), 2) as inventory_turnover_ratio,\n  ROUND(365.0 / (c.total_cogs / NULLIF(a.avg_inventory, 0)), 1) as days_in_inventory\nFROM cogs c, avg_inventory a",
    insertTextRules: 4,
    documentation: 'Calculate inventory turnover ratio and days in inventory',
    detail: 'Measure inventory management efficiency',
  },

  // ===== DATA WAREHOUSE PATTERNS =====
  {
    label: 'Slowly Changing Dimension Type 1 (overwrite)',
    kind: 15,
    insertText:
      '-- SCD Type 1: Overwrite old values\nUPDATE ${1:dim_customer}\nSET\n  ${2:address} = ${3:new_address},\n  ${4:city} = ${5:new_city},\n  updated_at = CURRENT_TIMESTAMP\nWHERE ${6:customer_key} = ${7:key_value}',
    insertTextRules: 4,
    documentation: 'SCD Type 1: Update dimension record in place',
    detail: 'No history tracking - simplest approach',
  },
  {
    label: 'Slowly Changing Dimension Type 2 (versioning)',
    kind: 15,
    insertText:
      '-- SCD Type 2: Keep full history with versioning\n\n-- Close current record\nUPDATE ${1:dim_customer}\nSET\n  valid_to = CURRENT_DATE,\n  is_current = 0\nWHERE ${2:customer_id} = ${3:cust_id}\n  AND is_current = 1;\n\n-- Insert new record\nINSERT INTO ${1:dim_customer} (\n  ${2:customer_id},\n  ${4:name},\n  ${5:address},\n  valid_from,\n  valid_to,\n  is_current,\n  version\n)\nSELECT\n  ${3:cust_id},\n  ${6:new_name},\n  ${7:new_address},\n  CURRENT_DATE,\n  NULL,\n  1,\n  COALESCE(MAX(version), 0) + 1\nFROM ${1:dim_customer}\nWHERE ${2:customer_id} = ${3:cust_id}',
    insertTextRules: 4,
    documentation: 'SCD Type 2: Create new version for changed records',
    detail: 'Full history tracking with effective dates',
  },
  {
    label: 'Slowly Changing Dimension Type 3 (limited history)',
    kind: 15,
    insertText:
      '-- SCD Type 3: Keep limited history in same row\nUPDATE ${1:dim_customer}\nSET\n  ${2:previous_address} = ${3:current_address},\n  ${3:current_address} = ${4:new_address},\n  ${5:address_change_date} = CURRENT_DATE\nWHERE ${6:customer_key} = ${7:key_value}',
    insertTextRules: 4,
    documentation:
      'SCD Type 3: Track limited history with previous/current columns',
    detail: 'Only one level of history',
  },
  {
    label: 'ETL pattern: Extract and load',
    kind: 15,
    insertText:
      "-- ETL Pattern: Extract, Transform, Load\n\n-- Step 1: Extract (staging table)\nCREATE TEMPORARY TABLE ${1:stg_orders} AS\nSELECT *\nFROM ${2:source_orders}\nWHERE ${3:load_date} = CURRENT_DATE;\n\n-- Step 2: Transform (clean and enrich)\nCREATE TEMPORARY TABLE ${4:transformed_orders} AS\nSELECT\n  ${5:order_id},\n  TRIM(UPPER(${6:customer_name})) as customer_name,\n  DATE(${7:order_date}) as order_date,\n  CAST(${8:amount} AS REAL) as amount,\n  CASE\n    WHEN ${8:amount} > 1000 THEN 'High'\n    WHEN ${8:amount} > 100 THEN 'Medium'\n    ELSE 'Low'\n  END as value_category\nFROM ${1:stg_orders}\nWHERE ${8:amount} > 0;\n\n-- Step 3: Load (into target)\nINSERT INTO ${9:target_orders}\nSELECT * FROM ${4:transformed_orders}",
    insertTextRules: 4,
    documentation: 'Complete ETL pattern with staging and transformation',
    detail: 'Data warehouse loading pattern',
  },
  {
    label: 'Incremental load pattern',
    kind: 15,
    insertText:
      "-- Incremental Load: Only process new/changed records\n\n-- Get last processed timestamp\nCREATE TEMPORARY TABLE last_load AS\nSELECT COALESCE(MAX(${1:loaded_at}), '1900-01-01') as last_load_time\nFROM ${2:target_table};\n\n-- Load only new records\nINSERT INTO ${2:target_table}\nSELECT\n  s.*,\n  CURRENT_TIMESTAMP as ${1:loaded_at}\nFROM ${3:source_table} s\nCROSS JOIN last_load l\nWHERE s.${4:updated_at} > l.last_load_time",
    insertTextRules: 4,
    documentation: 'Incremental load: Process only changed data',
    detail: 'Efficient for large datasets',
  },
  {
    label: 'Data quality check before load',
    kind: 15,
    insertText:
      "-- Data Quality Checks Before Loading\n\nWITH quality_checks AS (\n  SELECT\n    COUNT(*) as total_records,\n    SUM(CASE WHEN ${1:required_field} IS NULL THEN 1 ELSE 0 END) as null_required,\n    SUM(CASE WHEN ${2:amount} < 0 THEN 1 ELSE 0 END) as negative_amounts,\n    SUM(CASE WHEN ${3:date} > CURRENT_DATE THEN 1 ELSE 0 END) as future_dates,\n    COUNT(DISTINCT ${4:id}) as unique_ids\n  FROM ${5:staging_table}\n)\nSELECT\n  *,\n  CASE\n    WHEN null_required > 0 THEN 'FAIL: NULL values in required field'\n    WHEN negative_amounts > 0 THEN 'FAIL: Negative amounts found'\n    WHEN future_dates > 0 THEN 'FAIL: Future dates detected'\n    WHEN unique_ids != total_records THEN 'FAIL: Duplicate IDs'\n    ELSE 'PASS'\n  END as quality_status\nFROM quality_checks",
    insertTextRules: 4,
    documentation: 'Validate data quality before loading to warehouse',
    detail: 'Prevent bad data from entering system',
  },

  // ===== OLAP & ANALYTICAL QUERIES =====
  {
    label: 'ROLLUP for subtotals',
    kind: 15,
    insertText:
      '-- ROLLUP: Generate subtotals and grand totals\nSELECT\n  ${1:region},\n  ${2:product},\n  ${3:year},\n  SUM(${4:sales}) as total_sales,\n  COUNT(*) as order_count\nFROM ${5:sales_table}\nGROUP BY ${1:region}, ${2:product}, ${3:year}\n\nUNION ALL\n\nSELECT\n  ${1:region},\n  ${2:product},\n  NULL as ${3:year},\n  SUM(${4:sales}),\n  COUNT(*)\nFROM ${5:sales_table}\nGROUP BY ${1:region}, ${2:product}\n\nUNION ALL\n\nSELECT\n  ${1:region},\n  NULL as ${2:product},\n  NULL as ${3:year},\n  SUM(${4:sales}),\n  COUNT(*)\nFROM ${5:sales_table}\nGROUP BY ${1:region}\n\nUNION ALL\n\nSELECT\n  NULL as ${1:region},\n  NULL as ${2:product},\n  NULL as ${3:year},\n  SUM(${4:sales}),\n  COUNT(*)\nFROM ${5:sales_table}\n\nORDER BY 1, 2, 3',
    insertTextRules: 4,
    documentation: 'ROLLUP pattern: Create hierarchical subtotals',
    detail: 'SQLite manual implementation (no native ROLLUP)',
  },
  {
    label: 'CUBE for all combinations',
    kind: 15,
    insertText:
      '-- CUBE: All possible combinations of groupings\n-- This generates subtotals for every combination\nSELECT ${1:dim1}, ${2:dim2}, ${3:dim3}, SUM(${4:measure}) as total\nFROM ${5:table}\nGROUP BY ${1:dim1}, ${2:dim2}, ${3:dim3}\n\nUNION ALL\nSELECT ${1:dim1}, ${2:dim2}, NULL, SUM(${4:measure}) FROM ${5:table} GROUP BY ${1:dim1}, ${2:dim2}\n\nUNION ALL\nSELECT ${1:dim1}, NULL, ${3:dim3}, SUM(${4:measure}) FROM ${5:table} GROUP BY ${1:dim1}, ${3:dim3}\n\nUNION ALL\nSELECT NULL, ${2:dim2}, ${3:dim3}, SUM(${4:measure}) FROM ${5:table} GROUP BY ${2:dim2}, ${3:dim3}\n\nUNION ALL\nSELECT ${1:dim1}, NULL, NULL, SUM(${4:measure}) FROM ${5:table} GROUP BY ${1:dim1}\n\nUNION ALL\nSELECT NULL, ${2:dim2}, NULL, SUM(${4:measure}) FROM ${5:table} GROUP BY ${2:dim2}\n\nUNION ALL\nSELECT NULL, NULL, ${3:dim3}, SUM(${4:measure}) FROM ${5:table} GROUP BY ${3:dim3}\n\nUNION ALL\nSELECT NULL, NULL, NULL, SUM(${4:measure}) FROM ${5:table}',
    insertTextRules: 4,
    documentation: 'CUBE pattern: All dimensional combinations',
    detail: 'Manual CUBE implementation for OLAP analysis',
  },
  {
    label: 'Cohort retention analysis',
    kind: 15,
    insertText:
      'WITH cohort_items AS (\n  SELECT\n    ${1:user_id},\n    MIN(DATE(${2:activity_date})) as cohort_month\n  FROM ${3:user_activities}\n  GROUP BY ${1:user_id}\n),\nuser_activities AS (\n  SELECT\n    c.cohort_month,\n    a.${1:user_id},\n    DATE(a.${2:activity_date}) as activity_month,\n    CAST((JULIANDAY(a.${2:activity_date}) - JULIANDAY(c.cohort_month)) / 30 AS INTEGER) as month_number\n  FROM ${3:user_activities} a\n  JOIN cohort_items c ON a.${1:user_id} = c.${1:user_id}\n)\nSELECT\n  cohort_month,\n  COUNT(DISTINCT CASE WHEN month_number = 0 THEN ${1:user_id} END) as month_0,\n  COUNT(DISTINCT CASE WHEN month_number = 1 THEN ${1:user_id} END) as month_1,\n  COUNT(DISTINCT CASE WHEN month_number = 2 THEN ${1:user_id} END) as month_2,\n  COUNT(DISTINCT CASE WHEN month_number = 3 THEN ${1:user_id} END) as month_3,\n  ROUND(100.0 * COUNT(DISTINCT CASE WHEN month_number = 1 THEN ${1:user_id} END) /\n    NULLIF(COUNT(DISTINCT CASE WHEN month_number = 0 THEN ${1:user_id} END), 0), 1) as retention_month_1_pct\nFROM user_activities\nGROUP BY cohort_month\nORDER BY cohort_month',
    insertTextRules: 4,
    documentation: 'Cohort retention analysis by month',
    detail: 'Track user retention over time by cohort',
  },

  // ===== MATERIALIZED VIEW PATTERNS =====
  {
    label: 'Create materialized view (manual)',
    kind: 15,
    insertText:
      "-- SQLite doesn't have native materialized views\n-- Create table as query result (manual materialization)\n\nDROP TABLE IF EXISTS ${1:mv_summary};\n\nCREATE TABLE ${1:mv_summary} AS\nSELECT\n  ${2:dimension},\n  COUNT(*) as record_count,\n  SUM(${3:measure}) as total_measure,\n  AVG(${3:measure}) as avg_measure,\n  MIN(${4:date}) as first_date,\n  MAX(${4:date}) as last_date,\n  CURRENT_TIMESTAMP as materialized_at\nFROM ${5:source_table}\nGROUP BY ${2:dimension};\n\n-- Create index for performance\nCREATE INDEX idx_${1:mv_summary}_${2:dimension}\nON ${1:mv_summary}(${2:dimension});",
    insertTextRules: 4,
    documentation: 'Create materialized view (pre-aggregated table)',
    detail: 'Manually refresh by recreating table',
  },
  {
    label: 'Refresh materialized view',
    kind: 15,
    insertText:
      '-- Refresh Materialized View\nBEGIN TRANSACTION;\n\n-- Option 1: Complete refresh\nDROP TABLE IF EXISTS ${1:mv_temp};\n\nCREATE TABLE ${1:mv_temp} AS\nSELECT\n  ${2:columns},\n  CURRENT_TIMESTAMP as materialized_at\nFROM ${3:source_query};\n\nDROP TABLE ${4:mv_table};\nALTER TABLE ${1:mv_temp} RENAME TO ${4:mv_table};\n\nCOMMIT;\n\n-- Option 2: Incremental refresh (for append-only data)\n-- INSERT INTO ${4:mv_table}\n-- SELECT * FROM ${3:source_query}\n-- WHERE ${5:date} > (SELECT MAX(${5:date}) FROM ${4:mv_table});',
    insertTextRules: 4,
    documentation: 'Refresh materialized view with new data',
    detail: 'Complete or incremental refresh strategy',
  },

  // ===== REGEX & PATTERN MATCHING =====
  {
    label: 'REGEXP pattern matching',
    kind: 15,
    insertText:
      "-- Note: SQLite requires enabling REGEXP extension\n-- For now, using GLOB and LIKE patterns\n\nSELECT *\nFROM ${1:table}\nWHERE\n  -- Email pattern (basic)\n  ${2:email} LIKE '%@%.%'\n  -- Phone pattern (US format)\n  OR ${3:phone} GLOB '[0-9][0-9][0-9]-[0-9][0-9][0-9]-[0-9][0-9][0-9][0-9]'\n  -- Postal code (5 digits)\n  OR ${4:zip} GLOB '[0-9][0-9][0-9][0-9][0-9]'\n  -- Alphanumeric pattern\n  OR ${5:code} GLOB '[A-Z][A-Z][0-9][0-9][0-9]'",
    insertTextRules: 4,
    documentation: 'Pattern matching using LIKE and GLOB',
    detail: 'SQLite alternative to REGEXP',
  },
  {
    label: 'Extract domain from email',
    kind: 15,
    insertText:
      "SELECT\n  ${1:email},\n  SUBSTR(\n    ${1:email},\n    INSTR(${1:email}, '@') + 1\n  ) as domain\nFROM ${2:table}\nWHERE ${1:email} LIKE '%@%'",
    insertTextRules: 4,
    documentation: 'Extract domain portion from email address',
    detail: 'String manipulation for email parsing',
  },
  {
    label: 'Parse URL components',
    kind: 15,
    insertText:
      "SELECT\n  ${1:url},\n  -- Extract protocol\n  CASE\n    WHEN ${1:url} LIKE 'https://%' THEN 'https'\n    WHEN ${1:url} LIKE 'http://%' THEN 'http'\n    ELSE NULL\n  END as protocol,\n  -- Extract domain\n  SUBSTR(\n    SUBSTR(${1:url}, INSTR(${1:url}, '://') + 3),\n    1,\n    CASE\n      WHEN INSTR(SUBSTR(${1:url}, INSTR(${1:url}, '://') + 3), '/') > 0\n      THEN INSTR(SUBSTR(${1:url}, INSTR(${1:url}, '://') + 3), '/') - 1\n      ELSE LENGTH(SUBSTR(${1:url}, INSTR(${1:url}, '://') + 3))\n    END\n  ) as domain,\n  -- Extract path\n  SUBSTR(\n    ${1:url},\n    INSTR(${1:url}, '://') + 3 + INSTR(SUBSTR(${1:url}, INSTR(${1:url}, '://') + 3), '/')\n  ) as path\nFROM ${2:table}",
    insertTextRules: 4,
    documentation: 'Parse URL into protocol, domain, and path components',
    detail: 'Complex string parsing',
  },

  // ===== ADVANCED CASE STUDIES =====
  {
    label: 'Build sales dashboard query',
    kind: 15,
    insertText:
      "-- Complete dashboard query combining multiple metrics\nWITH date_range AS (\n  SELECT\n    DATE('${1:2024-01-01}') as start_date,\n    DATE('${2:2024-12-31}') as end_date\n),\nsales_metrics AS (\n  SELECT\n    STRFTIME('%Y-%m', ${3:order_date}) as month,\n    COUNT(DISTINCT ${4:order_id}) as order_count,\n    COUNT(DISTINCT ${5:customer_id}) as customer_count,\n    SUM(${6:order_total}) as revenue,\n    AVG(${6:order_total}) as avg_order_value,\n    SUM(${6:order_total}) / COUNT(DISTINCT ${5:customer_id}) as revenue_per_customer\n  FROM ${7:orders}\n  CROSS JOIN date_range\n  WHERE ${3:order_date} BETWEEN start_date AND end_date\n  GROUP BY month\n)\nSELECT\n  month,\n  order_count,\n  customer_count,\n  ROUND(revenue, 2) as revenue,\n  ROUND(avg_order_value, 2) as avg_order_value,\n  ROUND(revenue_per_customer, 2) as revenue_per_customer,\n  -- Growth calculations\n  order_count - LAG(order_count) OVER (ORDER BY month) as order_growth,\n  ROUND(\n    (revenue - LAG(revenue) OVER (ORDER BY month)) * 100.0 /\n    NULLIF(LAG(revenue) OVER (ORDER BY month), 0),\n    2\n  ) as revenue_growth_pct,\n  -- Running totals\n  SUM(revenue) OVER (ORDER BY month) as cumulative_revenue\nFROM sales_metrics\nORDER BY month",
    insertTextRules: 4,
    documentation: 'Complete sales dashboard with KPIs and trends',
    detail: 'Production-ready dashboard query',
  },
  {
    label: 'Product recommendation query',
    kind: 15,
    insertText:
      '-- Collaborative filtering: Products bought together\nWITH user_products AS (\n  SELECT DISTINCT\n    ${1:user_id},\n    ${2:product_id}\n  FROM ${3:order_items}\n),\nproduct_pairs AS (\n  SELECT\n    a.${2:product_id} as product_a,\n    b.${2:product_id} as product_b,\n    COUNT(DISTINCT a.${1:user_id}) as co_purchase_count\n  FROM user_products a\n  JOIN user_products b\n    ON a.${1:user_id} = b.${1:user_id}\n    AND a.${2:product_id} < b.${2:product_id}\n  GROUP BY product_a, product_b\n  HAVING co_purchase_count >= ${4:5}\n)\nSELECT\n  p.product_a,\n  pa.${5:product_name} as product_a_name,\n  p.product_b,\n  pb.${5:product_name} as product_b_name,\n  p.co_purchase_count,\n  RANK() OVER (PARTITION BY p.product_a ORDER BY p.co_purchase_count DESC) as recommendation_rank\nFROM product_pairs p\nJOIN ${6:products} pa ON p.product_a = pa.${2:product_id}\nJOIN ${6:products} pb ON p.product_b = pb.${2:product_id}\nORDER BY p.product_a, recommendation_rank',
    insertTextRules: 4,
    documentation: 'Frequently bought together recommendations',
    detail: 'Collaborative filtering pattern',
  },
  {
    label: 'A/B test analysis',
    kind: 15,
    insertText:
      "-- A/B Test Statistical Analysis\nWITH test_groups AS (\n  SELECT\n    ${1:variant},\n    COUNT(DISTINCT ${2:user_id}) as users,\n    COUNT(DISTINCT CASE WHEN ${3:converted} = 1 THEN ${2:user_id} END) as conversions,\n    SUM(${4:revenue}) as total_revenue\n  FROM ${5:experiment_data}\n  WHERE ${6:experiment_id} = ${7:'exp_123'}\n  GROUP BY ${1:variant}\n),\nmetrics AS (\n  SELECT\n    ${1:variant},\n    users,\n    conversions,\n    ROUND(CAST(conversions AS REAL) / users * 100, 2) as conversion_rate,\n    ROUND(total_revenue / users, 2) as revenue_per_user,\n    ROUND(total_revenue / NULLIF(conversions, 0), 2) as revenue_per_conversion\n  FROM test_groups\n)\nSELECT\n  m.*,\n  -- Compare to control (variant A)\n  m.conversion_rate - (SELECT conversion_rate FROM metrics WHERE ${1:variant} = 'A') as conv_rate_diff,\n  ROUND(\n    (m.conversion_rate - (SELECT conversion_rate FROM metrics WHERE ${1:variant} = 'A')) * 100.0 /\n    NULLIF((SELECT conversion_rate FROM metrics WHERE ${1:variant} = 'A'), 0),\n    2\n  ) as conv_rate_lift_pct\nFROM metrics m\nORDER BY ${1:variant}",
    insertTextRules: 4,
    documentation: 'A/B test analysis with conversion metrics',
    detail: 'Compare test variants statistically',
  },
]
