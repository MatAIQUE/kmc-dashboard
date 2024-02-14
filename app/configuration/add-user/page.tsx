import Nav from "../../../components/ui/nav";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "../../../components/ui/card";

const AddUserPage = () => {
  return (
    <>
      <Nav />
      <div className="p-2 pt-10 md:pt-10 sm:ml-64">
        <div className="rounded-lg dark:border-gray-700">
          <div className="grid flex justify-center gap-4 mb-4 mx-2">
            <Card className="w-[350px]">
              <CardHeader>
                <CardTitle>Add Users</CardTitle>
                <CardDescription></CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-2 gap-y-6">
                  <div
                    // Center Content
                    className="grid gap-2 gap-y-4"
                  >
                    <div
                      // First Name
                      className="gap-y-2 grid"
                    >
                      <div className="flex font-bold text-xs">
                        <h6 className="me-1">First Name</h6>
                        <span className="text-primary">*</span>
                      </div>
                      <input
                        placeholder="Client Name"
                        className="text-xs outline outline-gray-300 outline-1 rounded p-2"
                      />
                    </div>
                    <div
                      // Last Name
                      className="gap-y-2 grid"
                    >
                      <div className="flex font-bold text-xs">
                        <h6 className="me-1">Last Name</h6>
                        <span className="text-primary">*</span>
                      </div>
                      <input
                        placeholder="Last Name"
                        className="text-xs outline outline-gray-300 outline-1 rounded p-2"
                      />
                    </div>
                    <div
                      // Email Address
                      className="gap-y-2 grid"
                    >
                      <div className="flex font-bold text-xs">
                        <h6 className="me-1">Email Address</h6>
                        <span className="text-primary">*</span>
                      </div>
                      <input
                        placeholder="+63"
                        className="text-xs outline outline-gray-300 outline-1 rounded p-2"
                      />
                    </div>
                    <div
                      // Role Name
                      className="gap-y-2 grid"
                    >
                      <div className="flex font-bold text-xs">
                        <h6 className="me-1">Role</h6>
                        <span className="text-primary">*</span>
                      </div>
                      <input
                        placeholder="Select a Role"
                        type="dropdown"
                        className="text-xs outline outline-gray-300 outline-1 rounded p-2"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <button className="text-xs btn-secondary outline outline-gray-300 outline-1 p-2 rounded capitalize">
                      Cancel
                    </button>
                    <button className="text-xs bg-primary text-white p-2 rounded capitalize">
                      Invite
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddUserPage;
