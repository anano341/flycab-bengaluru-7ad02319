import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export const RideDetails = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle>Ride Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between">
            <span className="font-medium">ID</span>
            <span>001</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Start Location</span>
            <span>Nelamangala</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">End Location</span>
            <span>Hoskote</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Created At</span>
            <span>2025-11-25</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Price</span>
            <span>21635</span>
          </div>
          <Button asChild className="w-full">
            <Link to="/">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
