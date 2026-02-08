import { getRole } from "./units/jwt";
import { getStudentProfile, getTeacherProfile } from "./Service";

export const redirectByRole = async (navigate) => {
  const role = getRole();

  try {
    if (role === "STUDENT") {
      await getStudentProfile();
      navigate("/student/dashboard");
    }

    else if (role === "TEACHER") {
      await getTeacherProfile();
      navigate("/teachers/dashboard");
    }

    else if (role === "ADMIN") {
      navigate("/admin/dashboard");
    }

    else {
      navigate("/login");
    }

  } catch {
    if (role === "STUDENT") {
      navigate("/student/onboarding");
    }
    else if (role === "TEACHER") {
      navigate("/teachers/onboarding");
    }
    else {
      navigate("/login");
    }
  }
};
