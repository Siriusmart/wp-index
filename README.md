# Overview

Generates an index page of a directory with clickable links.

## Usage
1. Add it to project
    ```sh
    npm i wp-index
    ```
2. Apply it to any directory.
    ```jsonc
    // wrules.json
    {
        "processors": {
            "**/": "wp-index" // applies to all directories
    }
    ```

## Behaviour

Output location: index.html of the directory.

The index will include links to:
- All files in the directory.
- All subdirectories in the directory containing an index.html, this ensures all links in the index page links to an existing file.

## Options

|Option|Type|Default|Descripiton|
|---|---|---|---|
|priority|number|0|write priority of the generated file|
|excludes|string[]|&#91;index.html&#93;|list of files to exclude|
