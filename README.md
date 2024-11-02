# Visualizing School Distribution and Population Density in Indonesia

![Schools and Population Grid](./public/og.png)

## Background

Indonesia’s geography makes it tricky to ensure schools are accessible across all regions. By mapping where people live alongside school locations, this study shows how spatial data can reveal patterns of educational access across the country. This approach helps create a clearer picture of how schools are distributed, making it easier to understand and address educational reach for communities throughout Indonesia.

## Data

For this purpose, we use two data sources: Registered Indonesia Schools and a Population Density Map. These datasets are collected and processed before being presented on a web-based platform. For easy of use, we use parquet for final data

### Registered Indonesia Schools

Indonesia has two primary ministries that handle education: the Ministry of Education and Culture (Kementerian Pendidikan dan Kebudayaan, or Kemdikbud) and the Ministry of Religious Affairs (Kementerian Agama, or Kemenag). Both ministries oversee schools across similar levels, from pre-elementary (TK) to elementary, junior, and senior high schools, with most schools following the curriculum set by Kemdikbud. The main difference lies in school management, as schools under Kemenag focus primarily on religious education. This includes Madrasahs (Arabic for "schools"), which provide additional religious subjects, as well as Boarding Schools (Pondok Pesantren), which may follow unique curricula tailored to their religious focus.

We collected data from both ministries websites and processed it to ensure consistency in the final dataset. This involved standardizing metadata, including the total number of students, teachers, and employees, along with the crucial coordinate locations of each school. Additionally, we verified that each school's Point of Interest (POI) matched the intended region by comparing coordinates with regional boundaries. Using this method, we were able to confirm that 380,144 out of 475,252 entries were valid.

#### Metadata

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

### Population Density Map

We understand that no actual data for population density maps, all available data is only estimation based on it's location and statistics data. For population density maps, we used GHS-POP data from [Global Human Settlement Layer](https://human-settlement.emergency.copernicus.eu/).

We convert the data from raster to xyz values then combine them with regencies geometry to add more additional geographic information for each point.

#### Metadata

Table Name : `popgrid.parquet`

| Column Name    | Data Type | Comments                                 |
| -------------- | --------- | ---------------------------------------- |
| value          | DOUBLE    | Population density estimation            |
| location       | GEOMETRY  | Center of 1km\*1km grid (30 arc seconds) |
| kode_provinsi  | VARCHAR   | Province code (Kemendagri)               |
| kode_kabupaten | VARCHAR   | District/city code (Kemendagri)          |
| provinsi       | VARCHAR   | Province name (Kemendagri)               |
| kabupaten      | VARCHAR   | District/city name (Kemendagri)          |
