## [1.10.3](https://github.com/herbsjs/herbs-cli/compare/v1.10.2...v1.10.3) (2022-01-15)


### Bug Fixes

* fix package lock ([404bb52](https://github.com/herbsjs/herbs-cli/commit/404bb522458527812162e45d48535b5a4e4ee05c))
* update knex dependecy ([01e737b](https://github.com/herbsjs/herbs-cli/commit/01e737b15e4559125795a505c8562c6e05cd4407))

## [1.10.2](https://github.com/herbsjs/herbs-cli/compare/v1.10.1...v1.10.2) (2022-01-15)


### Bug Fixes

* creatting link for node_modules ([5681884](https://github.com/herbsjs/herbs-cli/commit/5681884ec556343d60526ca3e78afe01e4bb9eab))
* fix package-lock ([01e17ef](https://github.com/herbsjs/herbs-cli/commit/01e17ef058c5836c750cdb0c86bc67d2f00535ed))

## [1.10.1](https://github.com/herbsjs/herbs-cli/compare/v1.10.0...v1.10.1) (2022-01-15)


### Bug Fixes

* update dependencies ([59a492f](https://github.com/herbsjs/herbs-cli/commit/59a492fc8e073256898ea72d56113771314f2b85))

# [1.10.0](https://github.com/herbsjs/herbs-cli/compare/v1.9.3...v1.10.0) (2022-01-15)


### Bug Fixes

* fix dependencies installation on herbs new command ([673af30](https://github.com/herbsjs/herbs-cli/commit/673af309642c918fd993754be65e047bfb465fa7)), closes [#88](https://github.com/herbsjs/herbs-cli/issues/88)


### Features

* support for data layer generation with MySQL database ([6643895](https://github.com/herbsjs/herbs-cli/commit/6643895479b2b697add5672ba4a12a6d5085dd1b)), closes [#86](https://github.com/herbsjs/herbs-cli/issues/86)

## [1.9.3](https://github.com/herbsjs/herbs-cli/compare/v1.9.2...v1.9.3) (2021-12-13)


### Bug Fixes

* **tests:** tests are running 1000% faster now ([8dbe43c](https://github.com/herbsjs/herbs-cli/commit/8dbe43c4e71180fd6bd20f62a71f72102dc3a228)), closes [#24](https://github.com/herbsjs/herbs-cli/issues/24)

## [1.9.2](https://github.com/herbsjs/herbs-cli/compare/v1.9.1...v1.9.2) (2021-12-13)


### Bug Fixes

* **rest:** improve step desc and use cases names (Get vs Find) ([9816535](https://github.com/herbsjs/herbs-cli/commit/9816535ae9ea520cdb7983a041d5d912f5c19549))
* **templates:** improve step desc and use cases names (Get vs Find) ([edad41c](https://github.com/herbsjs/herbs-cli/commit/edad41c573be17ebb7cd8ff1a476fbef13d6aacc))

## [1.9.1](https://github.com/herbsjs/herbs-cli/compare/v1.9.0...v1.9.1) (2021-12-12)


### Bug Fixes

* small fixes and small improvements ([37ea12a](https://github.com/herbsjs/herbs-cli/commit/37ea12aa79fc69681bcca2e61ae8b138d97ad608))

# [1.9.0](https://github.com/herbsjs/herbs-cli/compare/v1.8.0...v1.9.0) (2021-12-12)


### Bug Fixes

* fix unit tests ([2b89c08](https://github.com/herbsjs/herbs-cli/commit/2b89c0886e9a8edf1829813a2d511d2c4d5efdd4))
* git merge and added getAll test ([ba795f6](https://github.com/herbsjs/herbs-cli/commit/ba795f6757a19d13cb7e91999ad24c2635f60e75)), closes [#52](https://github.com/herbsjs/herbs-cli/issues/52)


### Features

* **not found error test:** added not found error test ([66b36ed](https://github.com/herbsjs/herbs-cli/commit/66b36edc1a38d1da00e56fc26908fba42d6a7f32))
* generating two unit test for all usecases ([ead78ad](https://github.com/herbsjs/herbs-cli/commit/ead78ad1d7576f2ef82c9c562e2bf997d967858f))
* **🧪 generating test for all entities:** 🧪 Generating test for all entities dynamically ([572aa48](https://github.com/herbsjs/herbs-cli/commit/572aa484702463e92cc940f2ac82c21a8b14b63f))
* **generating dynamic tests:** generating dynamic tests ([32f56f2](https://github.com/herbsjs/herbs-cli/commit/32f56f28f9525bdf6f5020cd8e2f38f47757de64))

# [1.8.0](https://github.com/herbsjs/herbs-cli/compare/v1.7.2...v1.8.0) (2021-11-08)


### Features

* project generation with Git version control support ([2f79782](https://github.com/herbsjs/herbs-cli/commit/2f797829d68da13acaee367300f1d862bbefbd5c))
* project generation with Git version control support ([44272be](https://github.com/herbsjs/herbs-cli/commit/44272bedd38bff474d6861477164e6d0f640f8b5))

## [1.7.2](https://github.com/herbsjs/herbs-cli/compare/v1.7.1...v1.7.2) (2021-11-04)


### Bug Fixes

* change updateUsecase to return Err.notFound when the entity doesnt exists ([d6b55d9](https://github.com/herbsjs/herbs-cli/commit/d6b55d9fc98002774c47494a2e04ad5066e94e28))

## [1.7.1](https://github.com/herbsjs/herbs-cli/compare/v1.7.0...v1.7.1) (2021-10-25)


### Bug Fixes

* fixed lodash.startCase not found ([d236c23](https://github.com/herbsjs/herbs-cli/commit/d236c23f935e3e79e576a437854c8b5b8e4567ae))

# [1.7.0](https://github.com/herbsjs/herbs-cli/compare/v1.6.1...v1.7.0) (2021-10-25)


### Bug Fixes

* use intance connector into repository ([7349854](https://github.com/herbsjs/herbs-cli/commit/7349854b71770236f4a13b72a222cc11ea729345)), closes [#47](https://github.com/herbsjs/herbs-cli/issues/47)


### Features

* added herbs2mongo into template ([cfdc1aa](https://github.com/herbsjs/herbs-cli/commit/cfdc1aacc96a958cb82ec08ac8a4b73dc959b9d0)), closes [#47](https://github.com/herbsjs/herbs-cli/issues/47)
* using herbs2mongo ([3f843ba](https://github.com/herbsjs/herbs-cli/commit/3f843ba0b5e0e19071cd3d97ef5e28cdf72af010)), closes [#47](https://github.com/herbsjs/herbs-cli/issues/47)

## [1.6.1](https://github.com/herbsjs/herbs-cli/compare/v1.6.0...v1.6.1) (2021-10-14)


### Bug Fixes

* implementation a findAll method in mongodb repository template ([ea4c592](https://github.com/herbsjs/herbs-cli/commit/ea4c592f9ae024ebf18775c9d2cc62423b839635)), closes [#73](https://github.com/herbsjs/herbs-cli/issues/73)

# [1.6.0](https://github.com/herbsjs/herbs-cli/compare/v1.5.4...v1.6.0) (2021-10-13)


### Features

* getAll route implementation ([357932b](https://github.com/herbsjs/herbs-cli/commit/357932b901dd8273a8cb66dd1d5cfa2c7661fc13))

## [1.5.4](https://github.com/herbsjs/herbs-cli/compare/v1.5.3...v1.5.4) (2021-10-12)


### Bug Fixes

* bug when deleting a entity ([eef881b](https://github.com/herbsjs/herbs-cli/commit/eef881b90cb17a807bd653d83ba67fbafff76f9c))

## [1.5.3](https://github.com/herbsjs/herbs-cli/compare/v1.5.2...v1.5.3) (2021-10-12)


### Bug Fixes

* fix bug [#62](https://github.com/herbsjs/herbs-cli/issues/62) ([0d38396](https://github.com/herbsjs/herbs-cli/commit/0d383968380588c479b291e7a22e99c8dbb49c60))
* fix bugs [#60](https://github.com/herbsjs/herbs-cli/issues/60) [#62](https://github.com/herbsjs/herbs-cli/issues/62) [#63](https://github.com/herbsjs/herbs-cli/issues/63) ([b65909f](https://github.com/herbsjs/herbs-cli/commit/b65909fb37bf282f4275eb64044e1500a54bf7cf))

## [1.5.2](https://github.com/herbsjs/herbs-cli/compare/v1.5.1...v1.5.2) (2021-10-12)


### Bug Fixes

* herbs update - Entity with methods [#65](https://github.com/herbsjs/herbs-cli/issues/65) ([4651455](https://github.com/herbsjs/herbs-cli/commit/465145555a5530c111130e6dde122016c10e0653))

## [1.5.1](https://github.com/herbsjs/herbs-cli/compare/v1.5.0...v1.5.1) (2021-10-12)


### Bug Fixes

* remove single quotes from REST endpoints ([acebcd1](https://github.com/herbsjs/herbs-cli/commit/acebcd148ce0101c1542acffc92a7dd7f828c6af))

# [1.5.0](https://github.com/herbsjs/herbs-cli/compare/v1.4.4...v1.5.0) (2021-10-07)


### Features

* this change allows a usecase to be available or not on graphql ([38563a7](https://github.com/herbsjs/herbs-cli/commit/38563a7e0cd2fb4dfda9a3b9c066cd8dbcc262cb))

## [1.4.4](https://github.com/herbsjs/herbs-cli/compare/v1.4.3...v1.4.4) (2021-10-04)


### Bug Fixes

* package.json generation using initial project setup options ([50056d6](https://github.com/herbsjs/herbs-cli/commit/50056d64ae726ab8c87ba416971f3e2c8a8847fa)), closes [#54](https://github.com/herbsjs/herbs-cli/issues/54)
* package.json generation using initial project setup options ([6e66a47](https://github.com/herbsjs/herbs-cli/commit/6e66a47a8e5b21fb8060734274db5d717612de35)), closes [#54](https://github.com/herbsjs/herbs-cli/issues/54)

## [1.4.3](https://github.com/herbsjs/herbs-cli/compare/v1.4.2...v1.4.3) (2021-10-01)


### Bug Fixes

* generating repositories of new entities with the update command ([8f82f54](https://github.com/herbsjs/herbs-cli/commit/8f82f54266cf521543d33a07b20ebb085212cd7a)), closes [#50](https://github.com/herbsjs/herbs-cli/issues/50)

## [1.4.2](https://github.com/herbsjs/herbs-cli/compare/v1.4.1...v1.4.2) (2021-10-01)


### Bug Fixes

* fixed the knexFile.js generation on linux file system ([9dc13e6](https://github.com/herbsjs/herbs-cli/commit/9dc13e6d58d1203af187a6c5e921e13bc63b38f7))

## [1.4.1](https://github.com/herbsjs/herbs-cli/compare/v1.4.0...v1.4.1) (2021-09-29)


### Bug Fixes

* error on generate knexfile template on linux (case-sensitive) ([37ba7da](https://github.com/herbsjs/herbs-cli/commit/37ba7da0045847029ebb8676bcce2c005c3b1696)), closes [#48](https://github.com/herbsjs/herbs-cli/issues/48)

# [1.4.0](https://github.com/herbsjs/herbs-cli/compare/v1.3.1...v1.4.0) (2021-09-28)


### Features

* implementation of support for data layer generation with persistence in SQL Server database ([dbdf67e](https://github.com/herbsjs/herbs-cli/commit/dbdf67e22b205cc96d5b853f4ebc75e926a7d657)), closes [#27](https://github.com/herbsjs/herbs-cli/issues/27)
* include SQL Server support option ([f75da71](https://github.com/herbsjs/herbs-cli/commit/f75da71b1c83a67a3bbb5516b62f64711d4249a0)), closes [#27](https://github.com/herbsjs/herbs-cli/issues/27)

## [1.3.1](https://github.com/herbsjs/herbs-cli/compare/v1.3.0...v1.3.1) (2021-09-27)


### Bug Fixes

* add eslint to code ([1151fa6](https://github.com/herbsjs/herbs-cli/commit/1151fa6d4e2f62eeaa1cec643d67396acaeabe58))

# [1.3.0](https://github.com/herbsjs/herbs-cli/compare/v1.2.0...v1.3.0) (2021-09-23)


### Bug Fixes

* fixed entity import in getById and update tests ([1dd347f](https://github.com/herbsjs/herbs-cli/commit/1dd347f181d95e1584fda9aa6e21db739092c4e8))


### Features

* add new buchu errors ([b76722d](https://github.com/herbsjs/herbs-cli/commit/b76722dbc00ddcf7560044263cd78479eb1d1445))

# [1.2.0](https://github.com/herbsjs/herbs-cli/compare/v1.1.3...v1.2.0) (2021-09-23)


### Bug Fixes

* change name of step in getbyid ([81e99b1](https://github.com/herbsjs/herbs-cli/commit/81e99b1aae330d8bb3fff10d22d1d86fccf574f5))


### Features

* add tests for default usecases ([4c9f17f](https://github.com/herbsjs/herbs-cli/commit/4c9f17f4f79c424198bb8f7eafd387ebc7ab0d65))

## [1.1.3](https://github.com/herbsjs/herbs-cli/compare/v1.1.2...v1.1.3) (2021-09-23)


### Bug Fixes

* **package.json generator:** fixed the knexFile.js name on package.json generator ([e6197e5](https://github.com/herbsjs/herbs-cli/commit/e6197e57ef9c3eb98bb785e2b624082b080ddd0a))

## [1.1.2](https://github.com/herbsjs/herbs-cli/compare/v1.1.1...v1.1.2) (2021-09-22)


### Bug Fixes

* change the keyword herb to herbs in the package.json file ([b7fc4fc](https://github.com/herbsjs/herbs-cli/commit/b7fc4fc88e621a7dc3acfc0d504880a15b34cbac))
* disable introspection when is production ([5fa88f0](https://github.com/herbsjs/herbs-cli/commit/5fa88f0dac155d5b5c6b5a39ba3a495caacdba1d))

## [1.1.1](https://github.com/herbsjs/herbs-cli/compare/v1.1.0...v1.1.1) (2021-09-20)


### Bug Fixes

* adjust for installation of specific dependencies based on project setup ([ff359d4](https://github.com/herbsjs/herbs-cli/commit/ff359d4e8f7d41c14c682531ba778c6cd80d66f7)), closes [#29](https://github.com/herbsjs/herbs-cli/issues/29)
* adjustment of the installation of infra dependencies in the project setup ([5c56785](https://github.com/herbsjs/herbs-cli/commit/5c567850bf80db74f317857d4fa5e8e99d2a21a3))

# [1.1.0](https://github.com/herbsjs/herbs-cli/compare/v1.0.7...v1.1.0) (2021-09-10)

### Features

* **update:** added update command ([62b5fa2](https://github.com/herbsjs/herbs-cli/commit/62b5fa2e2a84996d4dbfe0542f277ddeb83c88d4))
* updating usecases ([14c7ce8](https://github.com/herbsjs/herbs-cli/commit/14c7ce889dbfcc482f2678decaa807ea04aac3ff))

## [1.0.7](https://github.com/herbsjs/herbs-cli/compare/v1.0.6...v1.0.7) (2021-08-31)

### Bug Fixes

* change usecase groups ([863fe06](https://github.com/herbsjs/herbs-cli/commit/863fe06d53c65b8c0cbe079e2108f7cf5a194352)), closes [#11](https://github.com/herbsjs/herbs-cli/issues/11)
* genereting routes dynamically ([e0e95fd](https://github.com/herbsjs/herbs-cli/commit/e0e95fdfc99c59bdad9aa5e5e1b90068396dd39e)), closes [#11](https://github.com/herbsjs/herbs-cli/issues/11)
* lint ([384b729](https://github.com/herbsjs/herbs-cli/commit/384b729638a61708a1ff9cc3e8ef1e5beb6a6ff4)), closes [#11](https://github.com/herbsjs/herbs-cli/issues/11)

## [1.0.6](https://github.com/herbsjs/herbs-cli/compare/v1.0.5...v1.0.6) (2021-08-20)

### Bug Fixes

* **routes missing:** fixed routes missing ([c723ae9](https://github.com/herbsjs/herbs-cli/commit/c723ae9f32dad03134c48a635e961706a333168e)), closes [#16](https://github.com/herbsjs/herbs-cli/issues/16)

## [1.0.5](https://github.com/herbsjs/herbs-cli/compare/v1.0.4...v1.0.5) (2021-08-19)

### Bug Fixes

* **eslint:** fix eslint requirement ([c902e07](https://github.com/herbsjs/herbs-cli/commit/c902e071c58c05bbfa9e18a8b0d7654bd3a56dcc)), closes [#17](https://github.com/herbsjs/herbs-cli/issues/17)
* **lint:** fix lint configuration ([5b1a7a2](https://github.com/herbsjs/herbs-cli/commit/5b1a7a292c951a324a691e44265dc9129a730914)), closes [#17](https://github.com/herbsjs/herbs-cli/issues/17)

## [1.0.4](https://github.com/herbsjs/herbs-cli/compare/v1.0.3...v1.0.4) (2021-08-06)

### Bug Fixes

* set version fixed into thrid part dependencies ([43952be](https://github.com/herbsjs/herbs-cli/commit/43952bece6ddec62c26a99963747750d13fe727e))

## [1.0.3](https://github.com/herbsjs/herbs-cli/compare/v1.0.2...v1.0.3) (2021-08-06)

### Bug Fixes

* fix herbsshelf import ([c85beff](https://github.com/herbsjs/herbs-cli/commit/c85beff4eb6c79323728c27f40bdb7e25cc2675e))

## [1.0.2](https://github.com/herbsjs/herbs-cli/compare/v1.0.1...v1.0.2) (2021-08-06)

### Bug Fixes

* fix herbs dependencies ([d5fd5a6](https://github.com/herbsjs/herbs-cli/commit/d5fd5a6b6a592c260a5b577937f4434112c3e0bf))

## [1.0.1](https://github.com/herbsjs/herbs-cli/compare/v1.0.0...v1.0.1) (2021-06-29)

### Bug Fixes

* change the libraries to new herbs organization ([70cf2cf](https://github.com/herbsjs/herbs-cli/commit/70cf2cf348d301b33164270186374846b84b83b6))

# 1.0.0 (2021-06-29)

## Features

* add semantic-release ([c9208cc](https://github.com/herbsjs/herbs-cli/commit/c9208cc0419d2d636205c5ac97858af9bfbf47b6))
