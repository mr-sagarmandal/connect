import happybase

connection = happybase.Connection('localhost')
connection.open()

table = connection.table('resume')

for key, data in table.scan():
    print key
    row = table.row(key, columns = [b'skill'])
    for keys in row:
        print row[keys]
