import type { languages } from 'monaco-editor'

export type MongoSuggestion = {
  label: string
  kind: languages.CompletionItemKind
  insertText: string
  insertTextRules?: languages.CompletionItemInsertTextRule
  documentation: string
  detail?: string
}

export const mongoSuggestions: Array<MongoSuggestion> = [
  // =================================================================
  // 1. TOP-LEVEL PIPELINE STAGES (20+)
  // =================================================================
  {
    label: '$match',
    kind: 15,
    insertText: '{\n  "$match": {\n    "${1:field}": ${2:value}\n  }\n}',
    insertTextRules: 4,
    documentation:
      'Filters the documents to pass only the documents that match the specified condition(s).',
    detail: 'Stage: Filter',
  },
  {
    label: '$project',
    kind: 15,
    insertText:
      '{\n  "$project": {\n    "${1:field}": 1,\n    "_id": 0\n  }\n}',
    insertTextRules: 4,
    documentation:
      'Reshapes each document in the stream, such as by adding new fields or removing existing fields.',
    detail: 'Stage: Reshape',
  },
  {
    label: '$group',
    kind: 15,
    insertText:
      '{\n  "$group": {\n    "_id": "$${1:groupByField}",\n    "${2:count}": { "$sum": 1 }\n  }\n}',
    insertTextRules: 4,
    documentation:
      'Groups input documents by a specified identifier expression and applies the accumulator expression(s).',
    detail: 'Stage: Group',
  },
  {
    label: '$sort',
    kind: 15,
    insertText: '{\n  "$sort": {\n    "${1:field}": ${2:-1}\n  }\n}',
    insertTextRules: 4,
    documentation: 'Reorders the document stream by a specified sort key.',
    detail: 'Stage: Sort',
  },
  {
    label: '$limit',
    kind: 15,
    insertText: '{\n  "$limit": ${1:10}\n}',
    insertTextRules: 4,
    documentation: 'Limits the number of documents passed to the next stage.',
    detail: 'Stage: Limit',
  },
  {
    label: '$skip',
    kind: 15,
    insertText: '{\n  "$skip": ${1:5}\n}',
    insertTextRules: 4,
    documentation: 'Skips the first N documents.',
    detail: 'Stage: Skip',
  },
  {
    label: '$unwind',
    kind: 15,
    insertText: '{\n  "$unwind": "$${1:arrayField}"\n}',
    insertTextRules: 4,
    documentation:
      'Deconstructs an array field from the input documents to output a document for each element.',
    detail: 'Stage: Flatten Array',
  },
  {
    label: '$lookup',
    kind: 15,
    insertText:
      '{\n  "$lookup": {\n    "from": "${1:collection}",\n    "localField": "${2:local_id}",\n    "foreignField": "${3:_id}",\n    "as": "${4:output_array}"\n  }\n}',
    insertTextRules: 4,
    documentation:
      'Performs a left outer join to another collection in the same database.',
    detail: 'Stage: Join',
  },
  {
    label: '$addFields',
    kind: 15,
    insertText:
      '{\n  "$addFields": {\n    "${1:newField}": "${2:expression}"\n  }\n}',
    insertTextRules: 4,
    documentation:
      'Adds new fields to documents. Similar to $project, but keeps all existing fields.',
    detail: 'Stage: Add Fields',
  },
  {
    label: '$count',
    kind: 15,
    insertText: '{\n  "$count": "${1:total_count}"\n}',
    insertTextRules: 4,
    documentation:
      'Passes a document to the next stage that contains a count of the number of documents input to the stage.',
    detail: 'Stage: Count',
  },
  {
    label: '$sortByCount',
    kind: 15,
    insertText: '{\n  "$sortByCount": "$${1:field}"\n}',
    insertTextRules: 4,
    documentation:
      'Groups incoming documents based on the value of a specified expression, then computes the count of documents in each distinct group.',
    detail: 'Stage: Sort By Count',
  },
  {
    label: '$facet',
    kind: 15,
    insertText:
      '{\n  "$facet": {\n    "${1:outputField1}": [ ${2:stage} ],\n    "${3:outputField2}": [ ${4:stage} ]\n  }\n}',
    insertTextRules: 4,
    documentation:
      'Processes multiple aggregation pipelines within a single stage on the same set of input documents.',
    detail: 'Stage: Multi-Pipeline',
  },
  {
    label: '$replaceRoot',
    kind: 15,
    insertText:
      '{\n  "$replaceRoot": {\n    "newRoot": "$${1:subDocumentField}"\n  }\n}',
    insertTextRules: 4,
    documentation: 'Replaces the input document with the specified document.',
    detail: 'Stage: Replace Root',
  },
  {
    label: '$sample',
    kind: 15,
    insertText: '{\n  "$sample": { "size": ${1:3} }\n}',
    insertTextRules: 4,
    documentation:
      'Randomly selects the specified number of documents from the input.',
    detail: 'Stage: Sample',
  },
  {
    label: '$merge',
    kind: 15,
    insertText:
      '{\n  "$merge": { "into": "${1:collection}", "on": "_id", "whenMatched": "replace", "whenNotMatched": "insert" }\n}',
    insertTextRules: 4,
    documentation:
      'Writes the resulting documents of the aggregation pipeline to a collection.',
    detail: 'Stage: Merge/Save',
  },
  {
    label: '$out',
    kind: 15,
    insertText: '{\n  "$out": "${1:collection}"\n}',
    insertTextRules: 4,
    documentation:
      'Writes the resulting documents of the aggregation pipeline to a collection.',
    detail: 'Stage: Out',
  },
  {
    label: '$redact',
    kind: 15,
    insertText:
      '{\n  "$redact": {\n    "$cond": {\n      "if": { "$eq": [ "$level", 5 ] },\n      "then": "$$PRUNE",\n      "else": "$$DESCEND"\n    }\n  }\n}',
    insertTextRules: 4,
    documentation:
      'Restricts the contents of the documents based on information stored in the documents themselves.',
    detail: 'Stage: Redact',
  },
  {
    label: '$bucket',
    kind: 15,
    insertText:
      '{\n  "$bucket": {\n    "groupBy": "$${1:field}",\n    "boundaries": [ ${2:0}, ${3:50}, ${4:100} ],\n    "default": "Other",\n    "output": { "count": { "$sum": 1 } }\n  }\n}',
    insertTextRules: 4,
    documentation:
      'Categorizes incoming documents into groups, called buckets, based on a specified expression and bucket boundaries.',
    detail: 'Stage: Bucket',
  },
  {
    label: '$bucketAuto',
    kind: 15,
    insertText:
      '{\n  "$bucketAuto": {\n    "groupBy": "$${1:field}",\n    "buckets": ${2:4}\n  }\n}',
    insertTextRules: 4,
    documentation:
      'Automatically categorizes documents into a specified number of buckets.',
    detail: 'Stage: Auto Bucket',
  },
  {
    label: '$geoNear',
    kind: 15,
    insertText:
      '{\n  "$geoNear": {\n    "near": { "type": "Point", "coordinates": [ ${1:-73.99}, ${2:40.73} ] },\n    "distanceField": "dist.calculated",\n    "maxDistance": ${3:1000},\n    "spherical": true\n  }\n}',
    insertTextRules: 4,
    documentation:
      'Outputs documents in order of nearest to farthest from a specified point.',
    detail: 'Stage: Geo Near',
  },

  // =================================================================
  // 2. QUERY OPERATORS (Inside $match) (20+)
  // =================================================================
  {
    label: '$eq',
    kind: 14,
    insertText: '"$eq": ${1:value}',
    insertTextRules: 4,
    documentation: 'Matches values that are equal to a specified value.',
    detail: 'Operator: Equal',
  },
  {
    label: '$ne',
    kind: 14,
    insertText: '"$ne": ${1:value}',
    insertTextRules: 4,
    documentation:
      'Matches all values that are not equal to a specified value.',
    detail: 'Operator: Not Equal',
  },
  {
    label: '$gt',
    kind: 14,
    insertText: '"$gt": ${1:value}',
    insertTextRules: 4,
    documentation: 'Matches values that are greater than a specified value.',
    detail: 'Operator: Greater Than',
  },
  {
    label: '$gte',
    kind: 14,
    insertText: '"$gte": ${1:value}',
    insertTextRules: 4,
    documentation:
      'Matches values that are greater than or equal to a specified value.',
    detail: 'Operator: Greater Than or Equal',
  },
  {
    label: '$lt',
    kind: 14,
    insertText: '"$lt": ${1:value}',
    insertTextRules: 4,
    documentation: 'Matches values that are less than a specified value.',
    detail: 'Operator: Less Than',
  },
  {
    label: '$lte',
    kind: 14,
    insertText: '"$lte": ${1:value}',
    insertTextRules: 4,
    documentation:
      'Matches values that are less than or equal to a specified value.',
    detail: 'Operator: Less Than or Equal',
  },
  {
    label: '$in',
    kind: 14,
    insertText: '"$in": [${1:val1}, ${2:val2}]',
    insertTextRules: 4,
    documentation: 'Matches any of the values specified in an array.',
    detail: 'Operator: In Array',
  },
  {
    label: '$nin',
    kind: 14,
    insertText: '"$nin": [${1:val1}, ${2:val2}]',
    insertTextRules: 4,
    documentation: 'Matches none of the values specified in an array.',
    detail: 'Operator: Not In Array',
  },
  {
    label: '$exists',
    kind: 14,
    insertText: '"$exists": ${1:true}',
    insertTextRules: 4,
    documentation: 'Matches documents that have the specified field.',
    detail: 'Operator: Field Exists',
  },
  {
    label: '$type',
    kind: 14,
    insertText: '"$type": "${1:string}"',
    insertTextRules: 4,
    documentation: 'Selects documents if a field is of the specified type.',
    detail: 'Operator: Type Check',
  },
  {
    label: '$regex',
    kind: 14,
    insertText: '"$regex": "${1:pattern}", "$options": "${2:i}"',
    insertTextRules: 4,
    documentation:
      'Selects documents where values match a specified regular expression.',
    detail: 'Operator: Regex',
  },
  {
    label: '$text',
    kind: 14,
    insertText: '"$text": { "$search": "${1:keywords}" }',
    insertTextRules: 4,
    documentation:
      'Performs text search on the content of the fields indexed with a text index.',
    detail: 'Operator: Text Search',
  },
  {
    label: '$mod',
    kind: 14,
    insertText: '"$mod": [ ${1:divisor}, ${2:remainder} ]',
    insertTextRules: 4,
    documentation:
      'Performs a modulo operation on the value of a field and selects documents with a specified result.',
    detail: 'Operator: Modulo',
  },
  {
    label: '$all',
    kind: 14,
    insertText: '"$all": [ "${1:val1}", "${2:val2}" ]',
    insertTextRules: 4,
    documentation:
      'Matches arrays that contain all elements specified in the query.',
    detail: 'Operator: Array Contains All',
  },
  {
    label: '$size',
    kind: 14,
    insertText: '"$size": ${1:num}',
    insertTextRules: 4,
    documentation: 'Matches any array with the number of elements specified.',
    detail: 'Operator: Array Size',
  },
  {
    label: '$elemMatch',
    kind: 14,
    insertText: '"$elemMatch": { "${1:field}": ${2:value} }',
    insertTextRules: 4,
    documentation:
      'Selects documents if element in the array field matches all the specified $elemMatch conditions.',
    detail: 'Operator: Array Element Match',
  },
  {
    label: '$or',
    kind: 14,
    insertText: '"$or": [ { "${1:f}": ${2:v} }, { "${3:f}": ${4:v} } ]',
    insertTextRules: 4,
    documentation: 'Logical OR.',
    detail: 'Operator: OR',
  },
  {
    label: '$and',
    kind: 14,
    insertText: '"$and": [ { "${1:f}": ${2:v} }, { "${3:f}": ${4:v} } ]',
    insertTextRules: 4,
    documentation: 'Logical AND.',
    detail: 'Operator: AND',
  },
  {
    label: '$nor',
    kind: 14,
    insertText: '"$nor": [ { "${1:f}": ${2:v} }, { "${3:f}": ${4:v} } ]',
    insertTextRules: 4,
    documentation: 'Logical NOR.',
    detail: 'Operator: NOR',
  },
  {
    label: '$not',
    kind: 14,
    insertText: '"$not": { "${1:operator}": ${2:value} }',
    insertTextRules: 4,
    documentation: 'Inverts the effect of a query expression.',
    detail: 'Operator: NOT',
  },

  // =================================================================
  // 3. ARRAY MANIPULATION (Expressions) (15+)
  // =================================================================
  {
    label: '$filter',
    kind: 12,
    insertText:
      '{\n  "$filter": {\n    "input": "$${1:array}",\n    "as": "${2:item}",\n    "cond": { "$${3:eq}": [ "$$${2:item}.${4:prop}", ${5:val} ] }\n  }\n}',
    insertTextRules: 4,
    documentation:
      'Selects a subset of an array to return based on the specified condition.',
    detail: 'Array: Filter',
  },
  {
    label: '$map',
    kind: 12,
    insertText:
      '{\n  "$map": {\n    "input": "$${1:array}",\n    "as": "${2:item}",\n    "in": { "$${3:toUpper}": "$$${2:item}" }\n  }\n}',
    insertTextRules: 4,
    documentation:
      'Applies an expression to each item in an array and returns an array with the applied results.',
    detail: 'Array: Map',
  },
  {
    label: '$reduce',
    kind: 12,
    insertText:
      '{\n  "$reduce": {\n    "input": "$${1:array}",\n    "initialValue": ${2:0},\n    "in": { "$add": [ "$$value", "$$this" ] }\n  }\n}',
    insertTextRules: 4,
    documentation:
      'Applies an expression to each element in an array and combines them into a single value.',
    detail: 'Array: Reduce',
  },
  {
    label: '$size',
    kind: 12,
    insertText: '{ "$size": "$${1:array}" }',
    insertTextRules: 4,
    documentation: 'Returns the number of elements in the array.',
    detail: 'Array: Size',
  },
  {
    label: '$arrayElemAt',
    kind: 12,
    insertText: '{ "$arrayElemAt": [ "$${1:array}", ${2:0} ] }',
    insertTextRules: 4,
    documentation: 'Returns the element at the specified array index.',
    detail: 'Array: Get Element',
  },
  {
    label: '$slice',
    kind: 12,
    insertText: '{ "$slice": [ "$${1:array}", ${2:skip}, ${3:limit} ] }',
    insertTextRules: 4,
    documentation: 'Returns a subset of an array.',
    detail: 'Array: Slice',
  },
  {
    label: '$concatArrays',
    kind: 12,
    insertText: '{ "$concatArrays": [ "$${1:arr1}", "$${2:arr2}" ] }',
    insertTextRules: 4,
    documentation: 'Concatenates arrays to return the concatenated array.',
    detail: 'Array: Concat',
  },
  {
    label: '$reverseArray',
    kind: 12,
    insertText: '{ "$reverseArray": "$${1:array}" }',
    insertTextRules: 4,
    documentation: 'Returns an array with the elements in reverse order.',
    detail: 'Array: Reverse',
  },
  {
    label: '$isArray',
    kind: 12,
    insertText: '{ "$isArray": "$${1:field}" }',
    insertTextRules: 4,
    documentation: 'Checks if the operand is an array.',
    detail: 'Array: Is Array',
  },
  {
    label: '$range',
    kind: 12,
    insertText: '{ "$range": [ ${1:0}, ${2:10}, ${3:1} ] }',
    insertTextRules: 4,
    documentation: 'Outputs an array containing a sequence of integers.',
    detail: 'Array: Range',
  },
  {
    label: '$indexOfArray',
    kind: 12,
    insertText: '{ "$indexOfArray": [ "$${1:array}", "${2:value}" ] }',
    insertTextRules: 4,
    documentation:
      'Searches an array for an occurrence of a specified value and returns the array index.',
    detail: 'Array: Index Of',
  },
  {
    label: '$zip',
    kind: 12,
    insertText: '{ "$zip": { "inputs": [ "$${1:arr1}", "$${2:arr2}" ] } }',
    insertTextRules: 4,
    documentation:
      'Transposes an array of input arrays so that the first element of the output array is an array containing the first element of the first input array, etc.',
    detail: 'Array: Zip',
  },
  {
    label: '$in',
    kind: 12,
    insertText: '{ "$in": [ "${1:value}", "$${2:array}" ] }',
    insertTextRules: 4,
    documentation:
      'Returns a boolean indicating whether a specified value is in an array.',
    detail: 'Array: Contains',
  },
  {
    label: '$first',
    kind: 12,
    insertText: '{ "$first": "$${1:array}" }',
    insertTextRules: 4,
    documentation:
      'Returns the first element of an array (only in $project/$addFields, differs from accumulator).',
    detail: 'Array: First',
  },
  {
    label: '$last',
    kind: 12,
    insertText: '{ "$last": "$${1:array}" }',
    insertTextRules: 4,
    documentation: 'Returns the last element of an array.',
    detail: 'Array: Last',
  },

  // =================================================================
  // 4. OBJECT & SET OPERATORS (10+)
  // =================================================================
  {
    label: '$mergeObjects',
    kind: 12,
    insertText: '{ "$mergeObjects": [ "$${1:obj1}", "$${2:obj2}" ] }',
    insertTextRules: 4,
    documentation: 'Combines multiple documents into a single document.',
    detail: 'Object: Merge',
  },
  {
    label: '$objectToArray',
    kind: 12,
    insertText: '{ "$objectToArray": "$${1:object}" }',
    insertTextRules: 4,
    documentation:
      'Converts a document to an array of documents representing key-value pairs.',
    detail: 'Object: To Array',
  },
  {
    label: '$arrayToObject',
    kind: 12,
    insertText: '{ "$arrayToObject": "$${1:array}" }',
    insertTextRules: 4,
    documentation: 'Converts an array of key-value pairs into a document.',
    detail: 'Object: From Array',
  },
  {
    label: '$setUnion',
    kind: 12,
    insertText: '{ "$setUnion": [ "$${1:a}", "$${2:b}" ] }',
    insertTextRules: 4,
    documentation:
      'Returns a set with elements that appear in any of the input sets.',
    detail: 'Set: Union',
  },
  {
    label: '$setIntersection',
    kind: 12,
    insertText: '{ "$setIntersection": [ "$${1:a}", "$${2:b}" ] }',
    insertTextRules: 4,
    documentation:
      'Returns a set with elements that appear in all of the input sets.',
    detail: 'Set: Intersection',
  },
  {
    label: '$setDifference',
    kind: 12,
    insertText: '{ "$setDifference": [ "$${1:a}", "$${2:b}" ] }',
    insertTextRules: 4,
    documentation:
      'Returns a set with elements that appear in the first set but not in the second.',
    detail: 'Set: Difference',
  },
  {
    label: '$setEquals',
    kind: 12,
    insertText: '{ "$setEquals": [ "$${1:a}", "$${2:b}" ] }',
    insertTextRules: 4,
    documentation: 'Checks if two sets have the same elements.',
    detail: 'Set: Equals',
  },
  {
    label: '$setIsSubset',
    kind: 12,
    insertText: '{ "$setIsSubset": [ "$${1:sub}", "$${2:super}" ] }',
    insertTextRules: 4,
    documentation:
      'Checks if all elements of the first set appear in the second.',
    detail: 'Set: Subset',
  },
  {
    label: '$anyElementTrue',
    kind: 12,
    insertText: '{ "$anyElementTrue": "$${1:array}" }',
    insertTextRules: 4,
    documentation:
      'Evaluates an array as a set and returns true if any element is true.',
    detail: 'Set: Any True',
  },
  {
    label: '$allElementsTrue',
    kind: 12,
    insertText: '{ "$allElementsTrue": "$${1:array}" }',
    insertTextRules: 4,
    documentation:
      'Evaluates an array as a set and returns true if no element is false.',
    detail: 'Set: All True',
  },

  // =================================================================
  // 5. STRING OPERATORS (15+)
  // =================================================================
  {
    label: '$concat',
    kind: 12,
    insertText: '{ "$concat": [ "$${1:str1}", "$${2:str2}" ] }',
    insertTextRules: 4,
    documentation: 'Concatenates any number of strings.',
    detail: 'String: Concat',
  },
  {
    label: '$substr',
    kind: 12,
    insertText: '{ "$substr": [ "$${1:str}", ${2:0}, ${3:5} ] }',
    insertTextRules: 4,
    documentation: 'Returns a substring.',
    detail: 'String: Substring',
  },
  {
    label: '$substrCP',
    kind: 12,
    insertText: '{ "$substrCP": [ "$${1:str}", ${2:0}, ${3:5} ] }',
    insertTextRules: 4,
    documentation: 'Returns a substring based on UTF-8 code points.',
    detail: 'String: Substring CP',
  },
  {
    label: '$toLower',
    kind: 12,
    insertText: '{ "$toLower": "$${1:str}" }',
    insertTextRules: 4,
    documentation: 'Converts a string to lowercase.',
    detail: 'String: Lower',
  },
  {
    label: '$toUpper',
    kind: 12,
    insertText: '{ "$toUpper": "$${1:str}" }',
    insertTextRules: 4,
    documentation: 'Converts a string to uppercase.',
    detail: 'String: Upper',
  },
  {
    label: '$strcasecmp',
    kind: 12,
    insertText: '{ "$strcasecmp": [ "$${1:str1}", "$${2:str2}" ] }',
    insertTextRules: 4,
    documentation: 'Compares two strings case-insensitively.',
    detail: 'String: Compare',
  },
  {
    label: '$split',
    kind: 12,
    insertText: '{ "$split": [ "$${1:str}", "${2:delim}" ] }',
    insertTextRules: 4,
    documentation: 'Divides a string into an array of substrings.',
    detail: 'String: Split',
  },
  {
    label: '$trim',
    kind: 12,
    insertText: '{ "$trim": { "input": "$${1:str}" } }',
    insertTextRules: 4,
    documentation: 'Removes whitespace from beginning and end.',
    detail: 'String: Trim',
  },
  {
    label: '$ltrim',
    kind: 12,
    insertText: '{ "$ltrim": { "input": "$${1:str}" } }',
    insertTextRules: 4,
    documentation: 'Removes whitespace from beginning.',
    detail: 'String: Left Trim',
  },
  {
    label: '$rtrim',
    kind: 12,
    insertText: '{ "$rtrim": { "input": "$${1:str}" } }',
    insertTextRules: 4,
    documentation: 'Removes whitespace from end.',
    detail: 'String: Right Trim',
  },
  {
    label: '$strLenCP',
    kind: 12,
    insertText: '{ "$strLenCP": "$${1:str}" }',
    insertTextRules: 4,
    documentation: 'Returns the length of a string (UTF-8 code points).',
    detail: 'String: Length',
  },
  {
    label: '$indexOfBytes',
    kind: 12,
    insertText: '{ "$indexOfBytes": [ "$${1:str}", "${2:search}" ] }',
    insertTextRules: 4,
    documentation: 'Returns the occurrence index of a substring (bytes).',
    detail: 'String: Index Bytes',
  },
  {
    label: '$indexOfCP',
    kind: 12,
    insertText: '{ "$indexOfCP": [ "$${1:str}", "${2:search}" ] }',
    insertTextRules: 4,
    documentation: 'Returns the occurrence index of a substring (code points).',
    detail: 'String: Index CP',
  },
  {
    label: '$regexFind',
    kind: 12,
    insertText:
      '{ "$regexFind": { "input": "$${1:str}", "regex": "${2:pattern}" } }',
    insertTextRules: 4,
    documentation: 'Applies a regex and returns the first match.',
    detail: 'String: Regex Find',
  },
  {
    label: '$regexFindAll',
    kind: 12,
    insertText:
      '{ "$regexFindAll": { "input": "$${1:str}", "regex": "${2:pattern}" } }',
    insertTextRules: 4,
    documentation: 'Applies a regex and returns all matches.',
    detail: 'String: Regex Find All',
  },

  // =================================================================
  // 6. ARITHMETIC & MATH (15+)
  // =================================================================
  {
    label: '$add',
    kind: 12,
    insertText: '{ "$add": [ "$${1:a}", ${2:b} ] }',
    insertTextRules: 4,
    documentation: 'Adds numbers.',
    detail: 'Math: Add',
  },
  {
    label: '$subtract',
    kind: 12,
    insertText: '{ "$subtract": [ "$${1:a}", ${2:b} ] }',
    insertTextRules: 4,
    documentation: 'Subtracts numbers.',
    detail: 'Math: Subtract',
  },
  {
    label: '$multiply',
    kind: 12,
    insertText: '{ "$multiply": [ "$${1:a}", ${2:b} ] }',
    insertTextRules: 4,
    documentation: 'Multiplies numbers.',
    detail: 'Math: Multiply',
  },
  {
    label: '$divide',
    kind: 12,
    insertText: '{ "$divide": [ "$${1:a}", ${2:b} ] }',
    insertTextRules: 4,
    documentation: 'Divides numbers.',
    detail: 'Math: Divide',
  },
  {
    label: '$mod',
    kind: 12,
    insertText: '{ "$mod": [ "$${1:a}", ${2:b} ] }',
    insertTextRules: 4,
    documentation: 'Modulo operation.',
    detail: 'Math: Mod',
  },
  {
    label: '$pow',
    kind: 12,
    insertText: '{ "$pow": [ "$${1:base}", ${2:exp} ] }',
    insertTextRules: 4,
    documentation: 'Power operation.',
    detail: 'Math: Power',
  },
  {
    label: '$sqrt',
    kind: 12,
    insertText: '{ "$sqrt": "$${1:num}" }',
    insertTextRules: 4,
    documentation: 'Square root.',
    detail: 'Math: Sqrt',
  },
  {
    label: '$abs',
    kind: 12,
    insertText: '{ "$abs": "$${1:num}" }',
    insertTextRules: 4,
    documentation: 'Absolute value.',
    detail: 'Math: Abs',
  },
  {
    label: '$ceil',
    kind: 12,
    insertText: '{ "$ceil": "$${1:num}" }',
    insertTextRules: 4,
    documentation: 'Rounds up.',
    detail: 'Math: Ceil',
  },
  {
    label: '$floor',
    kind: 12,
    insertText: '{ "$floor": "$${1:num}" }',
    insertTextRules: 4,
    documentation: 'Rounds down.',
    detail: 'Math: Floor',
  },
  {
    label: '$round',
    kind: 12,
    insertText: '{ "$round": [ "$${1:num}", ${2:decimals} ] }',
    insertTextRules: 4,
    documentation: 'Rounds to specified decimals.',
    detail: 'Math: Round',
  },
  {
    label: '$trunc',
    kind: 12,
    insertText: '{ "$trunc": [ "$${1:num}", ${2:0} ] }',
    insertTextRules: 4,
    documentation: 'Truncates a number.',
    detail: 'Math: Trunc',
  },
  {
    label: '$ln',
    kind: 12,
    insertText: '{ "$ln": "$${1:num}" }',
    insertTextRules: 4,
    documentation: 'Natural log.',
    detail: 'Math: Ln',
  },
  {
    label: '$log',
    kind: 12,
    insertText: '{ "$log": [ "$${1:num}", ${2:base} ] }',
    insertTextRules: 4,
    documentation: 'Logarithm.',
    detail: 'Math: Log',
  },
  {
    label: '$exp',
    kind: 12,
    insertText: '{ "$exp": "$${1:num}" }',
    insertTextRules: 4,
    documentation: 'Exponential.',
    detail: 'Math: Exp',
  },

  // =================================================================
  // 7. DATE & TIME (10+)
  // =================================================================
  {
    label: '$year',
    kind: 12,
    insertText: '{ "$year": "$${1:date}" }',
    insertTextRules: 4,
    documentation: 'Returns the year.',
    detail: 'Date: Year',
  },
  {
    label: '$month',
    kind: 12,
    insertText: '{ "$month": "$${1:date}" }',
    insertTextRules: 4,
    documentation: 'Returns the month (1-12).',
    detail: 'Date: Month',
  },
  {
    label: '$dayOfMonth',
    kind: 12,
    insertText: '{ "$dayOfMonth": "$${1:date}" }',
    insertTextRules: 4,
    documentation: 'Returns the day of month.',
    detail: 'Date: Day',
  },
  {
    label: '$hour',
    kind: 12,
    insertText: '{ "$hour": "$${1:date}" }',
    insertTextRules: 4,
    documentation: 'Returns the hour.',
    detail: 'Date: Hour',
  },
  {
    label: '$minute',
    kind: 12,
    insertText: '{ "$minute": "$${1:date}" }',
    insertTextRules: 4,
    documentation: 'Returns the minute.',
    detail: 'Date: Minute',
  },
  {
    label: '$second',
    kind: 12,
    insertText: '{ "$second": "$${1:date}" }',
    insertTextRules: 4,
    documentation: 'Returns the second.',
    detail: 'Date: Second',
  },
  {
    label: '$dayOfWeek',
    kind: 12,
    insertText: '{ "$dayOfWeek": "$${1:date}" }',
    insertTextRules: 4,
    documentation: 'Returns day of week (1=Sun, 7=Sat).',
    detail: 'Date: Day of Week',
  },
  {
    label: '$dateToString',
    kind: 12,
    insertText:
      '{\n  "$dateToString": {\n    "format": "${1:%Y-%m-%d}",\n    "date": "$${2:date}"\n  }\n}',
    insertTextRules: 4,
    documentation: 'Formats a date object to string.',
    detail: 'Date: Format',
  },
  {
    label: '$dateFromString',
    kind: 12,
    insertText:
      '{\n  "$dateFromString": {\n    "dateString": "$${1:dateStr}"\n  }\n}',
    insertTextRules: 4,
    documentation: 'Parses a date string to a date object.',
    detail: 'Date: Parse',
  },
  {
    label: '$isoDayOfWeek',
    kind: 12,
    insertText: '{ "$isoDayOfWeek": "$${1:date}" }',
    insertTextRules: 4,
    documentation: 'Returns ISO day of week (1=Mon, 7=Sun).',
    detail: 'Date: ISO Day',
  },

  // =================================================================
  // 8. LOGIC & CONTROL FLOW (5+)
  // =================================================================
  {
    label: '$cond',
    kind: 12,
    insertText:
      '{\n  "$cond": {\n    "if": { "${1:$gte}": [ "$${2:field}", ${3:val} ] },\n    "then": "${4:trueVal}",\n    "else": "${5:falseVal}"\n  }\n}',
    insertTextRules: 4,
    documentation: 'Ternary operator (if-then-else).',
    detail: 'Logic: Conditional',
  },
  {
    label: '$ifNull',
    kind: 12,
    insertText: '{ "$ifNull": [ "$${1:field}", "${2:default}" ] }',
    insertTextRules: 4,
    documentation: 'Returns replacement if value is null/missing.',
    detail: 'Logic: If Null',
  },
  {
    label: '$switch',
    kind: 12,
    insertText:
      '{\n  "$switch": {\n    "branches": [\n      { "case": { "${1:$eq}": [ "$${2:f}", ${3:v} ] }, "then": "${4:res}" }\n    ],\n    "default": "${5:def}"\n  }\n}',
    insertTextRules: 4,
    documentation: 'Switch statement.',
    detail: 'Logic: Switch',
  },
  {
    label: '$not',
    kind: 12,
    insertText: '{ "$not": [ "$${1:expression}" ] }',
    insertTextRules: 4,
    documentation: 'Boolean NOT.',
    detail: 'Logic: Not',
  },

  // =================================================================
  // 9. TYPE CONVERSION (5+)
  // =================================================================
  {
    label: '$toString',
    kind: 12,
    insertText: '{ "$toString": "$${1:field}" }',
    insertTextRules: 4,
    documentation: 'Casts to string.',
    detail: 'Type: String',
  },
  {
    label: '$toInt',
    kind: 12,
    insertText: '{ "$toInt": "$${1:field}" }',
    insertTextRules: 4,
    documentation: 'Casts to integer.',
    detail: 'Type: Int',
  },
  {
    label: '$toDouble',
    kind: 12,
    insertText: '{ "$toDouble": "$${1:field}" }',
    insertTextRules: 4,
    documentation: 'Casts to float/double.',
    detail: 'Type: Double',
  },
  {
    label: '$toBool',
    kind: 12,
    insertText: '{ "$toBool": "$${1:field}" }',
    insertTextRules: 4,
    documentation: 'Casts to boolean.',
    detail: 'Type: Bool',
  },
  {
    label: '$toDate',
    kind: 12,
    insertText: '{ "$toDate": "$${1:field}" }',
    insertTextRules: 4,
    documentation: 'Casts to date.',
    detail: 'Type: Date',
  },
  {
    label: '$convert',
    kind: 12,
    insertText:
      '{\n  "$convert": { "input": "$${1:f}", "to": "${2:string}", "onError": "${3:err}", "onNull": "${4:null}" }\n}',
    insertTextRules: 4,
    documentation: 'Converts a value to a specified type.',
    detail: 'Type: Convert',
  },

  // =================================================================
  // 10. ACCUMULATORS (for $group) (10+)
  // =================================================================
  {
    label: '$sum',
    kind: 12,
    insertText: '{ "$sum": ${1:1} }',
    insertTextRules: 4,
    documentation: 'Calculates the sum.',
    detail: 'Accumulator: Sum',
  },
  {
    label: '$avg',
    kind: 12,
    insertText: '{ "$avg": "$${1:field}" }',
    insertTextRules: 4,
    documentation: 'Calculates the average.',
    detail: 'Accumulator: Avg',
  },
  {
    label: '$min',
    kind: 12,
    insertText: '{ "$min": "$${1:field}" }',
    insertTextRules: 4,
    documentation: 'Finds the minimum value.',
    detail: 'Accumulator: Min',
  },
  {
    label: '$max',
    kind: 12,
    insertText: '{ "$max": "$${1:field}" }',
    insertTextRules: 4,
    documentation: 'Finds the maximum value.',
    detail: 'Accumulator: Max',
  },
  {
    label: '$push',
    kind: 12,
    insertText: '{ "$push": "$${1:field}" }',
    insertTextRules: 4,
    documentation: 'Adds value to an array.',
    detail: 'Accumulator: Push',
  },
  {
    label: '$addToSet',
    kind: 12,
    insertText: '{ "$addToSet": "$${1:field}" }',
    insertTextRules: 4,
    documentation: 'Adds unique value to an array.',
    detail: 'Accumulator: AddToSet',
  },
  {
    label: '$first',
    kind: 12,
    insertText: '{ "$first": "$${1:field}" }',
    insertTextRules: 4,
    documentation: 'Gets first value in group.',
    detail: 'Accumulator: First',
  },
  {
    label: '$last',
    kind: 12,
    insertText: '{ "$last": "$${1:field}" }',
    insertTextRules: 4,
    documentation: 'Gets last value in group.',
    detail: 'Accumulator: Last',
  },
  {
    label: '$stdDevPop',
    kind: 12,
    insertText: '{ "$stdDevPop": "$${1:field}" }',
    insertTextRules: 4,
    documentation: 'Population standard deviation.',
    detail: 'Accumulator: StdDevPop',
  },
  {
    label: '$stdDevSamp',
    kind: 12,
    insertText: '{ "$stdDevSamp": "$${1:field}" }',
    insertTextRules: 4,
    documentation: 'Sample standard deviation.',
    detail: 'Accumulator: StdDevSamp',
  },

  // =================================================================
  // 11. MISC & VARIABLES
  // =================================================================
  {
    label: '$let',
    kind: 12,
    insertText:
      '{\n  "$let": {\n    "vars": { "${1:varName}": "${2:val}" },\n    "in": "$$${1:varName}"\n  }\n}',
    insertTextRules: 4,
    documentation:
      'Defines variables for use within the scope of a subexpression.',
    detail: 'Var: Let',
  },
  {
    label: '$literal',
    kind: 12,
    insertText: '{ "$literal": "${1:value}" }',
    insertTextRules: 4,
    documentation: 'Return a value without parsing.',
    detail: 'Misc: Literal',
  },
  {
    label: '$rand',
    kind: 12,
    insertText: '{ "$rand": {} }',
    insertTextRules: 4,
    documentation: 'Returns a random float between 0 and 1.',
    detail: 'Misc: Random',
  },
  // =================================================================
  // 12. TRIGONOMETRY (New in Mongo 4.2+)
  // =================================================================
  {
    label: '$sin',
    kind: 12,
    insertText: '{ "$sin": "$${1:angle}" }',
    insertTextRules: 4,
    documentation: 'Returns the sine of a value (in radians).',
    detail: 'Trig: Sine',
  },
  {
    label: '$cos',
    kind: 12,
    insertText: '{ "$cos": "$${1:angle}" }',
    insertTextRules: 4,
    documentation: 'Returns the cosine of a value (in radians).',
    detail: 'Trig: Cosine',
  },
  {
    label: '$tan',
    kind: 12,
    insertText: '{ "$tan": "$${1:angle}" }',
    insertTextRules: 4,
    documentation: 'Returns the tangent of a value (in radians).',
    detail: 'Trig: Tangent',
  },
  {
    label: '$asin',
    kind: 12,
    insertText: '{ "$asin": "$${1:num}" }',
    insertTextRules: 4,
    documentation: 'Returns the inverse sine (in radians).',
    detail: 'Trig: Arc Sine',
  },
  {
    label: '$acos',
    kind: 12,
    insertText: '{ "$acos": "$${1:num}" }',
    insertTextRules: 4,
    documentation: 'Returns the inverse cosine (in radians).',
    detail: 'Trig: Arc Cosine',
  },
  {
    label: '$atan',
    kind: 12,
    insertText: '{ "$atan": "$${1:num}" }',
    insertTextRules: 4,
    documentation: 'Returns the inverse tangent (in radians).',
    detail: 'Trig: Arc Tangent',
  },
  {
    label: '$atan2',
    kind: 12,
    insertText: '{ "$atan2": [ "$${1:y}", "$${2:x}" ] }',
    insertTextRules: 4,
    documentation: 'Returns the inverse tangent of y / x (in radians).',
    detail: 'Trig: Arc Tangent 2',
  },
  {
    label: '$asinh',
    kind: 12,
    insertText: '{ "$asinh": "$${1:num}" }',
    insertTextRules: 4,
    documentation: 'Returns the inverse hyperbolic sine.',
    detail: 'Trig: Hyperbolic Arc Sine',
  },
  {
    label: '$acosh',
    kind: 12,
    insertText: '{ "$acosh": "$${1:num}" }',
    insertTextRules: 4,
    documentation: 'Returns the inverse hyperbolic cosine.',
    detail: 'Trig: Hyperbolic Arc Cosine',
  },
  {
    label: '$atanh',
    kind: 12,
    insertText: '{ "$atanh": "$${1:num}" }',
    insertTextRules: 4,
    documentation: 'Returns the inverse hyperbolic tangent.',
    detail: 'Trig: Hyperbolic Arc Tangent',
  },
  {
    label: '$degreesToRadians',
    kind: 12,
    insertText: '{ "$degreesToRadians": "$${1:angle}" }',
    insertTextRules: 4,
    documentation: 'Converts degrees to radians.',
    detail: 'Trig: Deg -> Rad',
  },
  {
    label: '$radiansToDegrees',
    kind: 12,
    insertText: '{ "$radiansToDegrees": "$${1:angle}" }',
    insertTextRules: 4,
    documentation: 'Converts radians to degrees.',
    detail: 'Trig: Rad -> Deg',
  },

  // =================================================================
  // 13. BITWISE OPERATORS
  // =================================================================
  {
    label: '$bitAnd',
    kind: 12,
    insertText: '{ "$bitAnd": [ "$${1:int}", ${2:mask} ] }',
    insertTextRules: 4,
    documentation: 'Returns the result of a bitwise AND operation.',
    detail: 'Bitwise: AND',
  },
  {
    label: '$bitOr',
    kind: 12,
    insertText: '{ "$bitOr": [ "$${1:int}", ${2:mask} ] }',
    insertTextRules: 4,
    documentation: 'Returns the result of a bitwise OR operation.',
    detail: 'Bitwise: OR',
  },
  {
    label: '$bitXor',
    kind: 12,
    insertText: '{ "$bitXor": [ "$${1:int}", ${2:mask} ] }',
    insertTextRules: 4,
    documentation: 'Returns the result of a bitwise XOR operation.',
    detail: 'Bitwise: XOR',
  },
  {
    label: '$bitNot',
    kind: 12,
    insertText: '{ "$bitNot": "$${1:int}" }',
    insertTextRules: 4,
    documentation: 'Returns the result of a bitwise NOT operation.',
    detail: 'Bitwise: NOT',
  },
  {
    label: '$bitsAllSet',
    kind: 14,
    insertText: '"$bitsAllSet": ${1:mask}',
    insertTextRules: 4,
    documentation:
      'Matches documents where all of the bit positions given by the mask are set.',
    detail: 'Query: Bits All Set',
  },
  {
    label: '$bitsAnySet',
    kind: 14,
    insertText: '"$bitsAnySet": ${1:mask}',
    insertTextRules: 4,
    documentation:
      'Matches documents where any of the bit positions given by the mask are set.',
    detail: 'Query: Bits Any Set',
  },
  {
    label: '$bitsAllClear',
    kind: 14,
    insertText: '"$bitsAllClear": ${1:mask}',
    insertTextRules: 4,
    documentation:
      'Matches documents where all of the bit positions given by the mask are clear.',
    detail: 'Query: Bits All Clear',
  },
  {
    label: '$bitsAnyClear',
    kind: 14,
    insertText: '"$bitsAnyClear": ${1:mask}',
    insertTextRules: 4,
    documentation:
      'Matches documents where any of the bit positions given by the mask are clear.',
    detail: 'Query: Bits Any Clear',
  },

  // =================================================================
  // 14. ADVANCED DATE ARITHMETIC (New in Mongo 5.0+)
  // =================================================================
  {
    label: '$dateAdd',
    kind: 12,
    insertText:
      '{\n  "$dateAdd": {\n    "startDate": "$${1:date}",\n    "unit": "${2:day}",\n    "amount": ${3:1}\n  }\n}',
    insertTextRules: 4,
    documentation: 'Adds a specified amount of time to a date.',
    detail: 'Date: Add',
  },
  {
    label: '$dateSubtract',
    kind: 12,
    insertText:
      '{\n  "$dateSubtract": {\n    "startDate": "$${1:date}",\n    "unit": "${2:day}",\n    "amount": ${3:1}\n  }\n}',
    insertTextRules: 4,
    documentation: 'Subtracts a specified amount of time from a date.',
    detail: 'Date: Subtract',
  },
  {
    label: '$dateDiff',
    kind: 12,
    insertText:
      '{\n  "$dateDiff": {\n    "startDate": "$${1:start}",\n    "endDate": "$${2:end}",\n    "unit": "${3:day}"\n  }\n}',
    insertTextRules: 4,
    documentation: 'Returns the difference between two dates.',
    detail: 'Date: Difference',
  },
  {
    label: '$dateTrunc',
    kind: 12,
    insertText:
      '{\n  "$dateTrunc": {\n    "date": "$${1:date}",\n    "unit": "${2:month}"\n  }\n}',
    insertTextRules: 4,
    documentation:
      'Truncates a date to a specific unit (e.g., start of the month).',
    detail: 'Date: Truncate',
  },
  {
    label: '$dateFromParts',
    kind: 12,
    insertText:
      '{\n  "$dateFromParts": {\n    "year": ${1:2023},\n    "month": ${2:1},\n    "day": ${3:1}\n  }\n}',
    insertTextRules: 4,
    documentation: 'Constructs a BSON Date from individual parts.',
    detail: 'Date: From Parts',
  },
  {
    label: '$dateToParts',
    kind: 12,
    insertText: '{ "$dateToParts": { "date": "$${1:date}" } }',
    insertTextRules: 4,
    documentation:
      'Returns a document containing the constituent parts of a date.',
    detail: 'Date: To Parts',
  },

  // =================================================================
  // 15. WINDOW FUNCTIONS (Used in $setWindowFields)
  // =================================================================
  {
    label: '$setWindowFields',
    kind: 15,
    insertText:
      '{\n  "$setWindowFields": {\n    "partitionBy": "$${1:field}",\n    "sortBy": { "${2:sortField}": 1 },\n    "output": {\n      "${3:rank}": {\n        "$rank": {}\n      }\n    }\n  }\n}',
    insertTextRules: 4,
    documentation:
      'Performs operations on a specified span of documents in a collection.',
    detail: 'Stage: Window Fields',
  },
  {
    label: '$denseRank',
    kind: 12,
    insertText: '{ "$denseRank": {} }',
    insertTextRules: 4,
    documentation: 'Returns the document rank (no gaps).',
    detail: 'Window: Dense Rank',
  },
  {
    label: '$rank',
    kind: 12,
    insertText: '{ "$rank": {} }',
    insertTextRules: 4,
    documentation: 'Returns the document rank (with gaps).',
    detail: 'Window: Rank',
  },
  {
    label: '$documentNumber',
    kind: 12,
    insertText: '{ "$documentNumber": {} }',
    insertTextRules: 4,
    documentation: 'Returns the position of the document in the window.',
    detail: 'Window: Doc Number',
  },
  {
    label: '$shift',
    kind: 12,
    insertText:
      '{\n  "$shift": {\n    "output": "$${1:field}",\n    "by": ${2:1},\n    "default": "${3:null}"\n  }\n}',
    insertTextRules: 4,
    documentation:
      'Returns the value from a document relative to the current document.',
    detail: 'Window: Shift',
  },
  {
    label: '$integral',
    kind: 12,
    insertText:
      '{ "$integral": { "input": "$${1:field}", "unit": "${2:hour}" } }',
    insertTextRules: 4,
    documentation: 'Calculates the approximation of the area under a curve.',
    detail: 'Window: Integral',
  },
  {
    label: '$derivative',
    kind: 12,
    insertText:
      '{ "$derivative": { "input": "$${1:field}", "unit": "${2:hour}" } }',
    insertTextRules: 4,
    documentation: 'Calculates the average rate of change.',
    detail: 'Window: Derivative',
  },
  {
    label: '$expMovingAvg',
    kind: 12,
    insertText: '{ "$expMovingAvg": { "input": "$${1:field}", "N": ${2:3} } }',
    insertTextRules: 4,
    documentation: 'Calculates the exponential moving average.',
    detail: 'Window: Exp Moving Avg',
  },

  // =================================================================
  // 16. UPDATE OPERATORS (For Playgrounds/CRUD)
  // =================================================================
  {
    label: '$set',
    kind: 14,
    insertText: '{\n  "$set": {\n    "${1:field}": ${2:value}\n  }\n}',
    insertTextRules: 4,
    documentation: 'Sets the value of a field in a document.',
    detail: 'Update: Set',
  },
  {
    label: '$unset',
    kind: 14,
    insertText: '{\n  "$unset": {\n    "${1:field}": ""\n  }\n}',
    insertTextRules: 4,
    documentation: 'Removes the specified field from a document.',
    detail: 'Update: Unset',
  },
  {
    label: '$inc',
    kind: 14,
    insertText: '{\n  "$inc": {\n    "${1:field}": ${2:1}\n  }\n}',
    insertTextRules: 4,
    documentation: 'Increments the value of the field by the specified amount.',
    detail: 'Update: Increment',
  },
  {
    label: '$mul',
    kind: 14,
    insertText: '{\n  "$mul": {\n    "${1:field}": ${2:2}\n  }\n}',
    insertTextRules: 4,
    documentation: 'Multiplies the value of the field by the specified amount.',
    detail: 'Update: Multiply',
  },
  {
    label: '$rename',
    kind: 14,
    insertText: '{\n  "$rename": {\n    "${1:oldName}": "${2:newName}"\n  }\n}',
    insertTextRules: 4,
    documentation: 'Renames a field.',
    detail: 'Update: Rename',
  },
  {
    label: '$min',
    kind: 14,
    insertText: '{\n  "$min": {\n    "${1:field}": ${2:value}\n  }\n}',
    insertTextRules: 4,
    documentation:
      'Updates the field if the specified value is less than the existing value.',
    detail: 'Update: Min',
  },
  {
    label: '$max',
    kind: 14,
    insertText: '{\n  "$max": {\n    "${1:field}": ${2:value}\n  }\n}',
    insertTextRules: 4,
    documentation:
      'Updates the field if the specified value is greater than the existing value.',
    detail: 'Update: Max',
  },
  {
    label: '$currentDate',
    kind: 14,
    insertText: '{\n  "$currentDate": {\n    "${1:field}": true\n  }\n}',
    insertTextRules: 4,
    documentation: 'Sets the value of a field to current date.',
    detail: 'Update: Current Date',
  },
  {
    label: '$addToSet',
    kind: 14,
    insertText: '{\n  "$addToSet": {\n    "${1:array}": ${2:value}\n  }\n}',
    insertTextRules: 4,
    documentation:
      'Adds elements to an array only if they do not already exist in the set.',
    detail: 'Update: Add to Set',
  },
  {
    label: '$pop',
    kind: 14,
    insertText:
      '{\n  "$pop": {\n    "${1:array}": ${2:1} // 1 for last, -1 for first\n  }\n}',
    insertTextRules: 4,
    documentation: 'Removes the first or last item of an array.',
    detail: 'Update: Pop',
  },
  {
    label: '$pull',
    kind: 14,
    insertText:
      '{\n  "$pull": {\n    "${1:array}": { "${2:field}": ${3:value} }\n  }\n}',
    insertTextRules: 4,
    documentation: 'Removes all array elements that match a specified query.',
    detail: 'Update: Pull',
  },
  {
    label: '$push',
    kind: 14,
    insertText: '{\n  "$push": {\n    "${1:array}": ${2:value}\n  }\n}',
    insertTextRules: 4,
    documentation: 'Appends a specified value to an array.',
    detail: 'Update: Push',
  },
  {
    label: '$pullAll',
    kind: 14,
    insertText:
      '{\n  "$pullAll": {\n    "${1:array}": [ ${2:val1}, ${3:val2} ]\n  }\n}',
    insertTextRules: 4,
    documentation: 'Removes all specified values from an array.',
    detail: 'Update: Pull All',
  },
  {
    label: '$setOnInsert',
    kind: 14,
    insertText: '{\n  "$setOnInsert": {\n    "${1:field}": ${2:value}\n  }\n}',
    insertTextRules: 4,
    documentation:
      'Sets the value of a field if an update results in an insert of a document.',
    detail: 'Update: Set On Insert',
  },

  // =================================================================
  // 17. SYSTEM VARIABLES
  // =================================================================
  {
    label: '$$NOW',
    kind: 21,
    insertText: '"$$NOW"',
    insertTextRules: 0,
    documentation: 'Variable: Returns the current datetime value.',
    detail: 'Var: NOW',
  },
  {
    label: '$$CLUSTER_TIME',
    kind: 21,
    insertText: '"$$CLUSTER_TIME"',
    insertTextRules: 0,
    documentation: 'Variable: Returns the current timestamp value.',
    detail: 'Var: Cluster Time',
  },
  {
    label: '$$ROOT',
    kind: 21,
    insertText: '"$$ROOT"',
    insertTextRules: 0,
    documentation: 'Variable: References the root document.',
    detail: 'Var: Root',
  },
  {
    label: '$$CURRENT',
    kind: 21,
    insertText: '"$$CURRENT"',
    insertTextRules: 0,
    documentation: 'Variable: References the start of the field path.',
    detail: 'Var: Current',
  },
  {
    label: '$$REMOVE',
    kind: 21,
    insertText: '"$$REMOVE"',
    insertTextRules: 0,
    documentation: 'Variable: Allows for the conditional exclusion of fields.',
    detail: 'Var: Remove',
  },
  {
    label: '$$DESCEND',
    kind: 21,
    insertText: '"$$DESCEND"',
    insertTextRules: 0,
    documentation: 'Variable: For $redact stage.',
    detail: 'Var: Descend',
  },
  {
    label: '$$PRUNE',
    kind: 21,
    insertText: '"$$PRUNE"',
    insertTextRules: 0,
    documentation: 'Variable: For $redact stage.',
    detail: 'Var: Prune',
  },
  {
    label: '$$KEEP',
    kind: 21,
    insertText: '"$$KEEP"',
    insertTextRules: 0,
    documentation: 'Variable: For $redact stage.',
    detail: 'Var: Keep',
  },

  // =================================================================
  // 18. GEOSPATIAL OPERATORS
  // =================================================================
  {
    label: '$geoWithin',
    kind: 14,
    insertText:
      '{\n  "$geoWithin": {\n    "$geometry": {\n      "type": "Polygon",\n      "coordinates": [ [ [${1:0}, ${2:0}], [${3:1}, ${4:1}], [${5:1}, ${6:0}], [${7:0}, ${8:0}] ] ]\n    }\n  }\n}',
    insertTextRules: 4,
    documentation: 'Selects geometries within a bounding GeoJSON geometry.',
    detail: 'Geo: Within',
  },
  {
    label: '$geoIntersects',
    kind: 14,
    insertText:
      '{\n  "$geoIntersects": {\n    "$geometry": {\n      "type": "Polygon",\n      "coordinates": [ ... ]\n    }\n  }\n}',
    insertTextRules: 4,
    documentation: 'Selects geometries that intersect with a GeoJSON geometry.',
    detail: 'Geo: Intersects',
  },
  {
    label: '$near',
    kind: 14,
    insertText:
      '{\n  "$near": {\n    "$geometry": { "type": "Point", "coordinates": [ ${1:x}, ${2:y} ] },\n    "$maxDistance": ${3:1000}\n  }\n}',
    insertTextRules: 4,
    documentation: 'Returns geospatial objects in proximity to a point.',
    detail: 'Geo: Near',
  },
  {
    label: '$nearSphere',
    kind: 14,
    insertText:
      '{\n  "$nearSphere": {\n    "$geometry": { "type": "Point", "coordinates": [ ${1:x}, ${2:y} ] },\n    "$maxDistance": ${3:1000}\n  }\n}',
    insertTextRules: 4,
    documentation:
      'Returns geospatial objects in proximity to a point on a sphere.',
    detail: 'Geo: Near Sphere',
  },
  {
    label: '$box',
    kind: 14,
    insertText: '"$box": [ [ ${1:bottomLeft} ], [ ${2:topRight} ] ]',
    insertTextRules: 4,
    documentation: 'Specifies a rectangle for a geospatial query.',
    detail: 'Geo: Box',
  },
  {
    label: '$center',
    kind: 14,
    insertText: '"$center": [ [ ${1:x}, ${2:y} ], ${3:radius} ]',
    insertTextRules: 4,
    documentation: 'Specifies a circle for a geospatial query.',
    detail: 'Geo: Center',
  },
  {
    label: '$centerSphere',
    kind: 14,
    insertText: '"$centerSphere": [ [ ${1:x}, ${2:y} ], ${3:radians} ]',
    insertTextRules: 4,
    documentation: 'Specifies a circle for a geospatial query on a sphere.',
    detail: 'Geo: Center Sphere',
  },
  {
    label: '$polygon',
    kind: 14,
    insertText:
      '"$polygon": [ [ ${1:x1}, ${2:y1} ], [ ${3:x2}, ${4:y2} ], [ ${5:x3}, ${6:y3} ] ]',
    insertTextRules: 4,
    documentation: 'Specifies a polygon for a geospatial query.',
    detail: 'Geo: Polygon',
  },

  // =================================================================
  // 19. MISCELLANEOUS & ADVANCED STAGES
  // =================================================================
  {
    label: '$graphLookup',
    kind: 15,
    insertText:
      '{\n  "$graphLookup": {\n    "from": "${1:collection}",\n    "startWith": "$${2:field}",\n    "connectFromField": "${3:from}",\n    "connectToField": "${4:to}",\n    "as": "${5:hierarchy}"\n  }\n}',
    insertTextRules: 4,
    documentation: 'Performs a recursive search on a collection.',
    detail: 'Stage: Graph Lookup',
  },
  {
    label: '$indexStats',
    kind: 15,
    insertText: '{ "$indexStats": {} }',
    insertTextRules: 4,
    documentation:
      'Returns statistics regarding the use of each index for the collection.',
    detail: 'Stage: Index Stats',
  },
  {
    label: '$planCacheStats',
    kind: 15,
    insertText: '{ "$planCacheStats": {} }',
    insertTextRules: 4,
    documentation: 'Returns plan cache information for a collection.',
    detail: 'Stage: Plan Cache',
  },
  {
    label: '$collStats',
    kind: 15,
    insertText:
      '{\n  "$collStats": {\n    "latencyStats": { "histograms": true },\n    "storageStats": {}\n  }\n}',
    insertTextRules: 4,
    documentation: 'Returns statistics regarding a collection or view.',
    detail: 'Stage: Collection Stats',
  },
  {
    label: '$comment',
    kind: 14,
    insertText: '"$comment": "${1:text}"',
    insertTextRules: 4,
    documentation: 'Adds a comment to the query predicate.',
    detail: 'Misc: Comment',
  },
  {
    label: '$jsonSchema',
    kind: 14,
    insertText:
      '{\n  "$jsonSchema": {\n    "required": [ "${1:field}" ],\n    "properties": {\n      "${1:field}": {\n        "bsonType": "string"\n      }\n    }\n  }\n}',
    insertTextRules: 4,
    documentation: 'Matches documents that satisfy the specified JSON Schema.',
    detail: 'Query: JSON Schema',
  },
  {
    label: '$expr',
    kind: 14,
    insertText:
      '{\n  "$expr": { "$gt": [ "$${1:field1}", "$${2:field2}" ] }\n}',
    insertTextRules: 4,
    documentation:
      'Allows using aggregation expressions within the query language.',
    detail: 'Query: Expression',
  },
  {
    label: '$where',
    kind: 14,
    insertText: '"$where": "this.${1:field} > 3"',
    insertTextRules: 4,
    documentation: 'Matches documents that satisfy a JavaScript expression.',
    detail: 'Query: JS Where',
  },
]
