/**
 * v0 by Vercel.
 * @see https://v0.dev/t/oceZ2KRlhb4
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";
import { useEffect } from "react";

const inputStyle =
  "flex dark:text-gray-400 rounded-md  items-center px-4 dark:bg-slate-900 w-full";

export default function Social(props) {
  const {
    nextStep,
    prevStep,
    handleInputChange,
    values,
    platforms,
    initialSocialValues,
    page,
  } = props;

  return (
    <Card className="w-full max-w-md dark:bg-gray-800">
      {page !== "appearance" && (
        <CardHeader>
          <CardTitle>Add Social Links</CardTitle>
          <CardDescription>
            Enter your social network profiles and links.
          </CardDescription>
        </CardHeader>
      )}

      <CardContent>
        <div className="space-y-4 w-full">
          {Object.keys(initialSocialValues).map((platform) => (
            <div key={platform} className="grid grid-cols-1 gap-4">
              <div className="grid grid-cols-[1fr_auto] items-center gap-2">
                <div className="flex items-center gap-2">
                  {platforms[platform].icon}
                  <div className={inputStyle}>
                    {platforms[platform].baseUrl}
                    <Input
                      onChange={handleInputChange}
                      value={values[platform].username}
                      name={platform}
                      placeholder={`username`}
                      className="ps-1 w-full"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      {page !== "appearance" && (
        <CardFooter>
          <div className="flex items-center space-x-2">
            <Button
              onClick={() => prevStep()}
              className="bg-blue-500 hover:bg-blue-600 text-white"
              variant="outline"
            >
              Previous
            </Button>
            <Button
              className="bg-blue-500 hover:bg-blue-600 text-white"
              variant="outline"
              onClick={() => nextStep()}
            >
              Continue
            </Button>
          </div>
        </CardFooter>
      )}
    </Card>
  );
}
