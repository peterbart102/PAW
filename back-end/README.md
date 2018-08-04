```bash
$ npm install
```
u can now start it with:
```bash
$ npm run start
```

or for a better experience u can install nest js CLI:
https://github.com/nestjs/nest-cli
```bash
$ npm install -g @nestjs/cli
```

with `nest serve` command u can create an instance of nest server with live reload feature

#Database
## General overview why we use MySql / mariaDB
MySQL provides a implementation of a SQL database very well suited for small to medium web pages. The database is free and open source with a commercial license available (MySQL is now owned by Oracle after they bought Sun).
Common applications for MySQL include php and java based web applications that require a DB storage backend, e.g. Dokuwiki, Joomla, xwiki etc. Very many applications that use MySQL are geared towards the LAMP stack (Linux, Apache, MySQL, php).
MySQL is usually used with 2 different storage engines, one is called MyISAM doesn't support transactions and stores each table in a set of 3 files. The second is called InnoDB which supports transactions, this storage engine stores all data in a single set of bytes or uses one set of bytes per database directory.


MySQL has one major advantage, since it is free, it is usually available on shared hosting packages and can be easily set up in a Linux, Unix or Windows environment. If a web application requires more than database, requires load balancing or sharding, it is easy to set up maybe instances of the database requiring only the hardware costs, as opposed to commercial databases that would require a single license for each instance.


MySQL has some issues with stability and clustering, it is very difficult to install a consistent database cluster with MySQL with the regular version. Depending on the database storage, MySQL will support transactions or not, so the requirements of the application have to be taken into account when creating the database tables.
For large, heavy loaded databases, it is a major operations problem that changing the database structure is only possible when locking the complete tables. This will mean that the database cannot be accessed during that operation so that this can only be done during low traffic times.

## TypeOrm
### Cascade
https://github.com/typeorm/typeorm#using-cascades-to-automatically-save-related-objects

