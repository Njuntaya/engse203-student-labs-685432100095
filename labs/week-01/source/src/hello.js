const student = {
  name: "ชื่อ นาย ณัฐวุฒิ จันทายา",
  studentId: "รหัสนักศึกษา 68543210009-5",
  os: process.platform,
  node: process.version,
};

function createGreeting({ name, studentId, os, node }) {
  return `Hello ${name} (${studentId}) | OS: ${os} | Node: ${node}`;
}

console.log(createGreeting(student));