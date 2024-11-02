We use [duckdb](https://duckdb.org/) as query engine to query our data directly from your browser, You can use a SQL-like dialect to create your queries, and we also utilize the [SPATIAL EXTENSION](https://duckdb.org/2023/04/28/spatial.html). If you're unsure how to use it, you can open the DuckDB console to experiment with any queries or to run queries that you do not want to display on the maps. We only provide 2 datasource:

- `sekolah.parquet` (schools location data)
- `popgrid.parquet` (population density)

You can query whatever you want from this data, like filtering only specific conditions or display all of data, As long as you follow the rules, your query and the data will be display correctly on maps.

## Schools Location (`sekolah.parquet`)

You can return any columns from your query, but to display the data on the maps, your query results must include the following columns:

| columns                          | required | default | comments                                                                                                                                                                                                                                                        |
| -------------------------------- | -------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ST_AsWKB(location) as location` | yes      | `-`     | Your query must return the location column using ST_AsWKB(location). [`ST_AsWKB`](https://duckdb.org/docs/extensions/spatial/functions.html#st_aswkb) is a special function from DuckDB that transforms geometry into Well-Known Binary data for later parsing. |
| `color`                          | no       | `-`     | We will generate a legend based on this column. After the query is completed, we will compare it to generate colors based on the values and the total colors used. You can use any column, but return the column name as `color`                                |
| `radius`                         | no       | `50`    | Similar to the color, you can customize the radius (in meters) of each point by returning a `radius` column.                                                                                                                                                    |

Additional columns from you query, such as `nama`, `pd` or others, etc (refers to [this](#metadata)) and this column will be shown in tooltip only when you hover the data.

### Metadata

| Column Name       | Data Type | Comments                                                                          |
| ----------------- | --------- | --------------------------------------------------------------------------------- |
| nama              | VARCHAR   | Name of the school                                                                |
| npsn              | VARCHAR   | National school registration number                                               |
| ptk               | BIGINT    | Total number of teachers                                                          |
| ptk_laki          | BIGINT    | Number of male teachers                                                           |
| ptk_perempuan     | BIGINT    | Number of female teachers                                                         |
| pegawai           | BIGINT    | Total number of staff/employees                                                   |
| pegawai_laki      | BIGINT    | Number of male staff/employees                                                    |
| pegawai_perempuan | BIGINT    | Number of female staff/employees                                                  |
| pd                | BIGINT    | Total number of students                                                          |
| pd_laki           | BIGINT    | Number of male students                                                           |
| pd_perempuan      | BIGINT    | Number of female students                                                         |
| rombel            | BIGINT    | Number of classes                                                                 |
| kode_provinsi     | VARCHAR   | Province code (Kemendagri)                                                        |
| kode_kabupaten    | VARCHAR   | District/city code (Kemendagri)                                                   |
| provinsi          | VARCHAR   | Province name (Kemendagri)                                                        |
| kabupaten         | VARCHAR   | District/city name (Kemendagri)                                                   |
| alamat            | VARCHAR   | School address                                                                    |
| status            | VARCHAR   | Status of the school, the value is either `negeri` (public) or `swasta` (Private) |
| jenjang           | VARCHAR   | Educational level of the school, (e.g SMA, MA, SMP, etc)                          |
| akreditasi        | VARCHAR   | Accreditation level of the school                                                 |
| source            | VARCHAR   | Source of the data collected, `kemenag` or `kemdikbud`                            |
| location          | GEOMETRY  | Geographic coordinates (lat, long) in geometry format                             |
| location_status   | VARCHAR   | Verification status of the school's location                                      |

Here information of possible values for `location_status` after comparing with region geometry, we use 514 district / city boundaries to check, if coordinates is inside the reported region or outside.

| `location_status`   | information                                                                                           |
| ------------------- | ----------------------------------------------------------------------------------------------------- |
| valid               | Reported region and coordinates are valid for either `kabupaten` (district) or `provinsi` (province). |
| potential-mistmatch | `kabupaten` (district) is incorrect, but the location is within the same `provinsi` (province).       |
| invalid             | Neither `kabupaten` nor `provinsi` matches the coordinates, coordinates outside of region             |
| maybe               | for Indonesia Schools Abroad (Luar Negeri), insufficient data for validation.                         |
| not-mapped          | Incorrect coordinate data, such as (0,0).                                                             |

## Population Density (`popgrid.parquet`)

You can run any query similar to the one for school locations, but the query for population density will be displayed as a grid instead of points. The values for the legend will be transformed based on the total colors, so each cell corresponds to the maximum values. Here are the columns you can use to display the data:

| columns                        | required | default | comments                                                                                                                                                                                                                                                          |
| ------------------------------ | -------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ST_AsWKB(location) as location | yes      | `-`     | Your query must return the location column using `ST_AsWKB(location)`. [`ST_AsWKB`](https://duckdb.org/docs/extensions/spatial/functions.html#st_aswkb) is a special function from DuckDB that transforms geometry into Well-Known Binary data for later parsing. |
| value                          | yes      | `-`     | The `value` column represents the population density data for each location. We will calculate the results and total colors to generate the color for each cell based on the value.                                                                               |

### Metadata

Table Name : `popgrid.parquet`

| Column Name    | Data Type | Comments                                 |
| -------------- | --------- | ---------------------------------------- |
| value          | DOUBLE    | Population density estimation            |
| location       | GEOMETRY  | Center of 1km\*1km grid (30 arc seconds) |
| kode_provinsi  | VARCHAR   | Province code (Kemendagri)               |
| kode_kabupaten | VARCHAR   | District/city code (Kemendagri)          |
| provinsi       | VARCHAR   | Province name (Kemendagri)               |
| kabupaten      | VARCHAR   | District/city name (Kemendagri)          |

## Sample Query

Here is sample query if you want to use

- All Senior High Schools In Jakarta
  ```sql
  SELECT
    75 as radius,
    jenjang as color,
    ST_AsWKB(location) as location
  FROM
    sekolah.parquet
  WHERE
    kode_provinsi = '31' AND
    jenjang IN ['SMA', 'SMK', 'MA'] AND
    location_status = 'valid'
  ```
- Public Schools in Central Java
  ```sql
  SELECT
    500 as radius,
    jenjang as color,
    ST_AsWKB(location) as location
  FROM
    sekolah.parquet
  WHERE
    kode_provinsi = '33' AND
    status = 'negeri' AND
    location_status = 'valid'
  ```
- Population Grid In Bali
  ```sql
  SELECT
    value,
    ST_AsWKB(location) as location
  FROM
    popgrid.parquet
  WHERE
    provinsi = 'Bali'
  ```
