const db = require('../config/db');

class Student {
    static async findAll() {
        const [rows] = await db.execute('SELECT * FROM students');
        return rows;
    }

    static async findById(id) {
        const [rows] = await db.execute('SELECT * FROM students WHERE id = ?', [id]);
        return rows[0];
    }

    static async create(data) {
        const { inst_id, i_name, name, reg_no } = data;
        const [result] = await db.execute('INSERT INTO students (ins_id, i_name, name, reg_no) VALUES (?, ?, ?, ?)', [inst_id, i_name, name, reg_no]);
        return result;
    }

    static async update(id, data) {
        const { inst_id, i_name, name, reg_no } = data;
        const [result] = await db.execute('UPDATE students SET ins_id = ?, i_name = ?, name = ?, reg_no = ? WHERE id = ?', [inst_id, i_name, name, reg_no, id]);
        return result;
    }

    static async patch(id, data) {
        const fields = [];
        const values = [];

        for (let key in data) {
            fields.push(`${key} = ?`);
            values.push(data[key]);
        }
        values.push(id);

        const [result] = await db.execute(`UPDATE students SET ${fields.join(', ')} WHERE id = ?`, values);
        return result;
    }

    static async delete(id) {
        const [result] = await db.execute('DELETE FROM students WHERE id = ?', [id]);
        return result;
    }
}

module.exports = Student;
