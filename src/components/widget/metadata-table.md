We use [duckdb](https://duckdb.org/) as query engine to query our data directly from your browser, You can use a SQL-like dialect to create your queries, and we also utilize the [SPATIAL EXTENSION](https://duckdb.org/2023/04/28/spatial.html). We only provide 2 datasource:

- `sekolah.parquet` (schools location data)
- `popgrid.parquet` (population density)

You can query whatever you want from this data, like filtering only specific conditions or display all of data. May be you can start with this

1. See listed data
   ```sql
   .files
   ```
2. Select first 10 schools
   ```sql
   SELECT
    nama
   FROM
    sekolah.parquet
   LIMIT 10
   ```

## Schools Location Metadata

Table Name : `sekolah.parquet`

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

## Population Density Metadata

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
    nama,
    jenjang,
    akreditasi
  FROM
    sekolah.parquet
  WHERE
    kode_provinsi = '31' AND
    jenjang IN ['SMA', 'SMK', 'MA'] AND
    location_status = 'valid'
  LIMIT 10
  ```
- Public Schools in Central Java
  ```sql
  SELECT
    nama,
    jenjang,
    status
  FROM
    sekolah.parquet
  WHERE
    kode_provinsi = '33' AND
    status = 'negeri' AND
    location_status = 'valid'
  LIMIT 10
  ```
